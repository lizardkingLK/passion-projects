using static treeShaker.Core.Helpers.ConsoleHelper;

namespace treeShaker.Core.Helpers;

public static class ApplicationHelper
{
    public static void HandleSuccess(string? message)
    {
        WriteLine(message, ConsoleColor.Green);
        Environment.Exit(0);
    }

    public static void HandleError(string? message)
    {
        WriteLine(message, ConsoleColor.Red);
        Environment.Exit(1);
    }
}