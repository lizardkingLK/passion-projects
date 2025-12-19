using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Helpers.ArithmeticHelper;
using mazes.Core.State.Common;

namespace mazes.Core.Helpers;

public static class MapHelper
{
    public static bool IsValidMapPosition(Position position, int height, int width)
    {
        return position.Y > 0
        && position.Y < height - 1
        && position.X > 0
        && position.X < width - 1;
    }

    public static bool IsValidMapPosition(
        Position position,
        Position[] exclusiveValids,
        int height,
        int width)
    => exclusiveValids.Contains(position)
    || IsValidMapPosition(position, height, width);

    public static void DrawMap(Block[,] mapGrid)
    {
        int y;
        int x;
        char symbol;
        foreach (Block block in mapGrid)
        {
            ((y, x), symbol) = block;
            WriteAt(y, x, symbol, (ConsoleColor)block.Color);
        }
    }

    public static void DrawBoard(
        int height,
        int width,
        out Block[,] mapGrid)
    {
        mapGrid = new Block[height, width];

        int length = height * width;
        int y;
        int x;
        char symbol;
        for (int i = 0; i < length; i++)
        {
            y = i / width;
            x = i % width;
            symbol = SymbolWall;
            // symbol = _symbols[Random.Shared.Next(_symbols.Length)];
            if (y > 0
            && y < height - 1
            && y % 2 != 0
            && x > 0
            && x < width - 1
            && x % 2 != 0)
            {
                symbol = SymbolSpace;
            }

            mapGrid[y, x] = new Block(new(y, x), symbol);
        }
    }

    public static DirectionEnum? GetReversedDirection(DirectionEnum direction)
    {
        if (direction == DirectionEnum.Top)
        {
            return DirectionEnum.Down;
        }
        else if (direction == DirectionEnum.Right)
        {
            return DirectionEnum.Left;
        }
        else if (direction == DirectionEnum.Down)
        {
            return DirectionEnum.Top;
        }
        else if (direction == DirectionEnum.Left)
        {
            return DirectionEnum.Right;
        }

        return null;
    }

    public static void DrawStartEnd(
        (int Y, int X) start,
        (int Y, int X) end,
        Block[,] mapGrid)
    {
        mapGrid[start.Y, start.X] = new(start, SymbolSpace);
        mapGrid[end.Y, end.X] = new(end, SymbolSpace);
    }

    public static void GetOpenings(
        int height,
        int width,
        out Position start,
        out Position end)
    => (start, end) = ((height - 2, 0), (1, width - 1));

    public static Result<(int, int)> GetDimensions(
        string[] args)
    {
        int height;
        int width;
        if (args.Length < 2)
        {
            height = Console.WindowHeight;
            width = Console.WindowWidth;
            return new((height, width));
        }

        height = int.Parse(args[0]);
        width = int.Parse(args[1]);
        if (height < MinHeight || width < MinWidth)
        {
            return new((-1, -1), "error. invalid dimensions given");
        }

        if (height % 2 == 0)
        {
            height -= 1;
        }

        if (width % 2 == 0)
        {
            width -= 1;
        }

        return new((height, width));
    }

    public static int GetHeuristicDistance(Position start, Position end)
    => GetAbsoluteValue(end.Y - start.Y) + GetAbsoluteValue(end.X - start.X);
}