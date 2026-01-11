namespace treeShaker.Core.Tests.Helpers;

public static class FileHelper
{
    public static string GetFullFilePath(params string[] paths)
    => Path.Combine(
        Directory.GetCurrentDirectory(),
        Path.Combine(paths));
}