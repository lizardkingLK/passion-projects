namespace imgtoodee.Core;

internal class Result<T>(T? data, string? errors)
{
    internal T? Data { get; } = data;

    internal string? Errors { get; } = errors;
}