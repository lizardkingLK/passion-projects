namespace treeShaker.Core.Processors.IgnoreProcessors;

public class IgnoreProcessor(string filePath)
{
    private readonly string _filePath = filePath;

    private readonly CommentIgnoreProcessor? _ignoreProcessor = new();

    public HashSet<string> GetKeepSet()
    {
        HashSet<string> collector = [];

        string[] content = File.ReadAllLines(_filePath);
        foreach (string line in content)
        {
            _ignoreProcessor?.Process(line, collector);
        }

        return collector;
    }
}