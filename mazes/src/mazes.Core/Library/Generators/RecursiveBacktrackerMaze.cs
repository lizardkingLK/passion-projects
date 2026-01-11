using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.ListHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Generators;

public class RecursiveBacktrackerMaze : IMaze
{
    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }

    public void Generate(out Block[,] mapGrid)
    {
        DrawBoard(Height, Width, out mapGrid);
        DrawPath((Height - 2, 1), mapGrid);
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

    private void DrawPath(Position start, Block[,] mapGrid)
    {
        bool[,] visitedGrid = new bool[Height, Width];

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

                if (visitedGrid![next.Y, next.X])
                {
                    continue;
                }

                positions.Push(next);

                direction = GetReversedDirection(direction)!.Value;
                wall = next + _directionPositions[direction];
                if (!IsValidMapPosition(wall, Height, Width))
                {
                    continue;
                }

                visitedGrid![next.Y, next.X] = true;
                mapGrid![wall.Y, wall.X] = new(next, SymbolSpace);
            }

            visitedGrid![current.Y, current.X] = true;
        }
    }
}