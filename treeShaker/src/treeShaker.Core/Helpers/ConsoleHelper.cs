namespace treeShaker.Core.Helpers;

public static class ConsoleHelper
{
    public static void WriteLine(
        object? content,
        ConsoleColor foregroundColor)
    {
        Console.ForegroundColor = foregroundColor;
        Console.WriteLine(content);
        Console.ResetColor();
    }   
}