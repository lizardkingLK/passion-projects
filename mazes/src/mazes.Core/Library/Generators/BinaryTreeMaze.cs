using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Generators;

public class BinaryTreeMaze : IMaze
{
    private static readonly DirectionEnum[] _directions
    = [DirectionEnum.Top, DirectionEnum.Right];

    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }

    public void Generate(out Block[,] mapGrid)
    {
        DrawBoard(Height, Width, out mapGrid);
        DrawPath(mapGrid);
        DrawStartEnd(
            ((int, int))Start,
            ((int, int))End, mapGrid);
        Print(mapGrid);
    }

    public void Print(Block[,] mapGrid)
    {
        Clear();
        DrawMap(mapGrid);
    }

    private void DrawPath(Block[,] mapGrid)
    {
        int length = Height * Width - Width;
        int y;
        int x;
        Position next;
        Position wall;
        DirectionEnum direction;
        int directionIndex;
        for (int i = Width; i < length; i++)
        {
            y = i / Width;
            x = i % Width;
            if (y % 2 == 0 || x % 2 == 0)
            {
                continue;
            }

            next = new Position(y, x);
            directionIndex = Random.Shared.Next(2);
            direction = _directions[directionIndex];
            wall = next + _directionPositions[direction];
            if (!IsValidMapPosition(wall, Height, Width))
            {
                directionIndex = (directionIndex + 1) % 2;
                direction = _directions[directionIndex];
                wall = next + _directionPositions[direction];
            }

            if (!IsValidMapPosition(wall, Height, Width))
            {
                continue;
            }

            ClearWall(wall, mapGrid);
        }
    }

    private static void ClearWall(Position wall, Block[,] mapGrid)
    {
        (int y, int x) = wall;
        mapGrid[y, x] = new(wall, SymbolSpace);
    }
}