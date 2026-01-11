namespace mazes.Core.Helpers;

public static class ConsoleHelper
{
    public static void Clear()
    {
        Console.Clear();
    }

    public static void WriteAt(int y, int x, char symbol, ConsoleColor color)
    {
        Console.SetCursorPosition(x, y);
        Console.ForegroundColor = color;
        Console.Write(symbol);
        Console.ResetColor();
    }

    public static void Error(string message)
    {
        Clear();
        Console.SetCursorPosition(0, 0);
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(message);
        Console.ResetColor();
        Environment.Exit(1);
    }
}