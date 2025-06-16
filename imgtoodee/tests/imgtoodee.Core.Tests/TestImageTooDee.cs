namespace imgtoodee.Core.Tests;

using static Utility;

[Collection("imgtoodee.Core.Tests")]
public class TestImageTooDee
{
    [Theory]
    [InlineData(@"data\img1.png")]
    public void Should_Test_For_File_Types(string filePath)
    {
        // Arrange
        string absoluteFilePath = GetAbsoluteFilePath(filePath);

        // Act


        // Assert
        Assert.True(true);
    }
}
