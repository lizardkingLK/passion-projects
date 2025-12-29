using treeShaker.Core.Processors.IgnoreProcessors;
using static treeShaker.Core.Tests.Helpers.FileHelper;
using static treeShaker.Core.Tests.Shared.Constants;

namespace treeShaker.Core.Tests;

public class TestGitIgnore
{
    [Fact]
    public void Should_Ignore_Comments()
    {
        // Arrange
        string filePath = GetFullFilePath(PathData, "Comments", ".gitignore");

        // Act
        IgnoreProcessor ignoreProcessor = new(filePath);
        HashSet<string> keepSet = ignoreProcessor.GetKeepSet();

        // Assert
        Assert.Empty(keepSet);
    }
}
