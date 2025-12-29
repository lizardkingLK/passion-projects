using System.Text;
using treeShaker.Core.State;
using static treeShaker.Core.Shared.Constants;

namespace treeShaker.Core.Processors;

public static class PathProcessor
{
    public static Result<string> Process(string path)
    {
        StringBuilder fileListBuilder = new();

        Stack<string> directories = [];
        directories.Push(path);
        string[] childPaths;
        int count = 0;
        while (directories.TryPop(out string? currentPath))
        {
            fileListBuilder.AppendLine(currentPath);
            count++;
            childPaths = Directory.GetDirectories(currentPath);
            foreach (string childPath in childPaths)
            {
                directories.Push(childPath);
            }

            childPaths = Directory.GetFiles(currentPath);
            foreach (string childPath in childPaths)
            {
                fileListBuilder.AppendLine(childPath);
                count++;
            }
        }

        string filePath = Path.Combine(
            Directory.GetCurrentDirectory(),
            PathDefaultOutput);

        File.WriteAllText(filePath, fileListBuilder.ToString());

        return new($"info. written {count} lines on {filePath}");
    }
}