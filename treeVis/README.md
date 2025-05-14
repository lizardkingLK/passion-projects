
## Run Project

Clone the repository

```bash
  git clone https://github.com/lizardkingLK/passion-projects
```

Go to the project directory

```bash
  cd passion-projects/treeVis
```

Install dependencies

```bash
  npm install
```

Build the App

```bash
  npm run build
```

### Locally

Run App

```bash
  npm run dev
```

### With Docker

In the command line

```bash
  docker build -t treevis .
  docker run --name treevis -d -p 8080:80 treevis
```

Or use the script

```bash
  dockerize.ps1
```
