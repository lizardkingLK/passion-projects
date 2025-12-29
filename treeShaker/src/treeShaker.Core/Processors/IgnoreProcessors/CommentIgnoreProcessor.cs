using treeShaker.Core.Processors.IgnoreProcessors.Abstractions;
using static treeShaker.Core.Shared.Constants;

namespace treeShaker.Core.Processors.IgnoreProcessors;

public class CommentIgnoreProcessor : IIgnoreProcessor
{
    public IIgnoreProcessor? Next { get; init; }

    public void Process(string line, HashSet<string> collector)
    {
        line = line.Trim();
        if (line.StartsWith(SymbolHash))
        {
            return;
        }

        Next?.Process(line, collector);
    }
}