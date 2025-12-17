using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Mazes;

public class BinaryTreeMaze : IMaze
{
    private static Block[,]? _mapGrid;

    private static bool[,]? _visitedGrid;

    public int Height { get; init; }

    public int Width { get; init; }

    public BinaryTreeMaze(int height, int width)
    => (Height, Width) = (height, width);

    public void Generate()
    {
        DrawBoard(Height, Width, out _mapGrid, out _visitedGrid);
        DrawPath();
        DrawStartEnd((Height - 2, 0), (1, Width - 1), _mapGrid);
        Print();
    }

    public void Print()
    {
        Clear();
        DrawMap(_mapGrid!);
        WriteAt(Height + 1, 0, '\0', ConsoleColor.White);
    }

    private void DrawPath()
    {
        int length = Height * Width - Width;
        int y;
        int x;
        Position next;
        Position wall;
        DirectionEnum[] directions = [DirectionEnum.Top, DirectionEnum.Right];
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
            direction = directions[directionIndex];
            wall = next + _directionPositions[direction];
            if (!IsValidMapPosition(wall, Height, Width))
            {
                directionIndex = (directionIndex + 1) % 2;
                direction = directions[directionIndex];
                wall = next + _directionPositions[direction];
            }

            if (!IsValidMapPosition(wall, Height, Width))
            {
                continue;
            }

            _visitedGrid![y, x] = true;
            (y, x) = wall;

            _mapGrid![y, x] = new Block(wall, SymbolSpace);
        }
    }

    public void Solve()
    {
        throw new NotImplementedException();
    }
}