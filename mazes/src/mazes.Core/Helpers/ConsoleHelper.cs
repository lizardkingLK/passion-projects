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
}