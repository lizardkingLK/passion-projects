using treeShaker.Core.State;

namespace treeShaker.Core.Validators;

public static class PathValidator
{
    public static Result<string> Validate(string[] args)
    {
        string path = args[0].Trim();
        if (Directory.Exists(path))
        {
            return new(path);
        }

        return new(null, "error. invalid directory path was given");
    }
}