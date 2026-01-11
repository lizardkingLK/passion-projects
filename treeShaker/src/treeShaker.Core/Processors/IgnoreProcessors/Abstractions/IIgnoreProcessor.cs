namespace treeShaker.Core.Processors.IgnoreProcessors.Abstractions;

public interface IIgnoreProcessor
{
    public void Process(string line, HashSet<string> collector);
    public IIgnoreProcessor? Next { get; init; }
}