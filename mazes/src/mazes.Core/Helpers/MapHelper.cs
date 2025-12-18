using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Shared.Constants;

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
        out Block[,] mapGrid,
        out bool[,] visitedGrid)
    {
        visitedGrid = new bool[height, width];
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

    public static DirectionEnum GetReversedDirection(DirectionEnum direction)
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
        else
        {
            return DirectionEnum.Left;
        }
    }

    public static void DrawStartEnd((int Y, int X) start, (int Y, int X) end, Block[,] mapGrid)
    {
        mapGrid[start.Y, start.X] = new(start, SymbolSpace);
        mapGrid[end.Y, end.X] = new(end, SymbolSpace);
    }
}