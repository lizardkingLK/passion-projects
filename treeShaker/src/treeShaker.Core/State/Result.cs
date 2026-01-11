namespace treeShaker.Core.State;

public record Result<T>(T? Data, string? Errors = null)
{
    public bool HasErrors { get; } = Errors != null;

    public T Value { get; } = Data!;
}