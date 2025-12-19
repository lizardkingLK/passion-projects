namespace mazes.Core.State.Common;

public record Result<T>(T? Data = default, string? Errors = null)
{
    public bool HasErrors() => Errors != null;
}