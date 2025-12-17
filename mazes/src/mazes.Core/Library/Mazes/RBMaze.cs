using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.ListHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Mazes;

// Recursive Backtracker Maze
public class RBMaze : IMaze
{
    private static Block[,]? _mapGrid;

    private static bool[,]? _visitedGrid;

    public int Height { get; init; }

    public int Width { get; init; }

    public RBMaze(int height, int width)
    => (Height, Width) = (height, width);

    public void Generate()
    {
        DrawBoard(Height, Width, out _mapGrid, out _visitedGrid);
        DrawPath((Height - 2, 1));
        DrawStartEnd((Height - 2, 0), (1, Width - 1));
        Print();
    }

    public void Print()
    {
        Clear();
        DrawMap(_mapGrid!);
        WriteAt(Height + 1, 0, '\0', ConsoleColor.White);
    }

    public void Solve()
    {
        throw new NotImplementedException();
    }

    private void DrawPath(Position start)
    {
        Stack<Position> positions = new();
        Position current = start;
        positions.Push(current);

        Position stepped;
        Position next;
        DirectionEnum direction;
        Position wall;
        int directionsCount = _directions.Length;
        while (positions.Count != 0)
        {
            current = positions.Pop();
            Shuffle(_directions);
            for (int i = 0; i < directionsCount; i++)
            {
                direction = _directions[i];
                stepped = _directionPositions[direction];
                next = current + stepped * 2;
                if (!IsValidMapPosition(next, Height, Width))
                {
                    continue;
                }

                if (_visitedGrid![next.Y, next.X])
                {
                    continue;
                }

                positions.Push(next);

                direction = GetReversedDirection(direction);
                wall = next + _directionPositions[direction];
                if (!IsValidMapPosition(wall, Height, Width))
                {
                    continue;
                }

                _visitedGrid![wall.Y, wall.X] = true;
                _mapGrid![wall.Y, wall.X] = new Block(next, SymbolSpace);
            }

            _visitedGrid![current.Y, current.X] = true;
        }
    }

    private static void DrawStartEnd((int Y, int X) start, (int Y, int X) end)
    {
        _mapGrid![start.Y, start.X] = new(start, SymbolSpace);
        _visitedGrid![start.Y, start.X] = true;

        _mapGrid![end.Y, end.X] = new(end, SymbolSpace);
        _visitedGrid![end.Y, end.X] = true;
    }
}