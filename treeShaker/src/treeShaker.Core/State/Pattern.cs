using treeShaker.Core.Enums;

namespace treeShaker.Core.State;

public record Pattern(string Path)
{
    public string Path { get; set; } = Path;
    public List<string> Children { get; set; } = [];
    public PatternFormEnum Form { get; set; }
    public PatternTypeEnum Type { get; set; }
}