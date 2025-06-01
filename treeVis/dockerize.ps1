# gets the node version
$nodeVersionOutput = (& node --version)

# checks if node available
$isNodeAvailable = [Regex]::IsMatch(
    $nodeVersionOutput,
    "^v[0-9]*.[0-9]*.[0-9]*$")

if (-not $isNodeAvailable) {
    Write-Host `
        -ForegroundColor Red `
        "error. node is not available"
    Exit
}

# install packages
Write-Host `
    -ForegroundColor Cyan `
    -Message "info. installing node packages"

& npm install

# delete if dist directory available
Write-Host `
    -ForegroundColor Cyan `
    -Message "info. removing dist directory"

if (Test-Path 'dist') {
    Remove-Item -Path 'dist' -Recurse -Force
}

# build and create dist directory
Write-Host `
    -ForegroundColor Cyan `
    -Message "info. rebuilding dist directory"

$buildOutputArray = (& npm run build)

$hasBuildFailed = (
    ($buildOutputArray[$buildOutputArray.Length - 1]) `
        -notmatch 'built in')
if ($hasBuildFailed) {
    Write-Host `
        -ForegroundColor Red `
        -Message "error. rebuild failed"
    Exit
}

# gets the docker version
$dockerVersionOutput = (& docker --version)

# checks if docker available
$isDockerAvailable = [Regex]::IsMatch(
    $dockerVersionOutput,
    "^Docker version [0-9]*.[0-9]*.[0-9]*, build [a-z0-9]*$")

if (-not $isDockerAvailable) {
    Write-Host `
        -ForegroundColor Red `
        -Message "error. docker is not available"
    Exit
}

# assign image name
$imageName = "nginx:alpine"

# checks if nginx image available
$isImageAvailable = ((& docker image ls $imageName) `
        -split '\n').Length -ge 2

# pull docker image for nginx
if (-not $isImageAvailable) {
    Write-Host `
        -ForegroundColor Cyan `
        -Message "info. pulling docker image"

    & docker pull $imageName
}

# assign container name(s)
$containerNames = @("treevis3", "treevis2", "treevis1", "treevis")

# remove contains if running
foreach ($containerName in $containerNames) {
    # name filter
    $nameFilter = "name=$containerName"

    # check if container with image is running
    $statusFilter = "status=running"
    $isContainerRunningResult = (& docker ps `
            --filter $nameFilter `
            --filter $statusFilter)
    $isContainerRunning = ($isContainerRunningResult `
            -split '\n').Length -ge 2

    # stop the container if running
    if ($isContainerRunning) {
        Write-Host `
            -ForegroundColor Cyan `
            -Message "info. stopping the running container"

        & docker container stop $containerName
    }

    # check if stopped container with image exist
    $hasContainerStopped = ((& docker ps -a `
                --filter $nameFilter) `
            -split '\n').Length -ge 2

    # remove the container from list
    if ($hasContainerStopped) {
        Write-Host `
            -ForegroundColor Cyan `
            -Message "info. removing the running container"

        & docker container rm $containerName
    }
}

# build the container
Write-Host `
    -ForegroundColor Cyan `
    -Message "info. building the container"

& docker build -t $containerName .

# run the container
Write-Host `
    -ForegroundColor Cyan `
    -Message "info. running the container"

& docker run `
    --name $containerName -d `
    -p 8080:80 `
    $containerName

# write the ready to test url
Write-Host `
    -ForegroundColor Cyan `
    -Message `
    "info. test the build with http://localhost:8080"