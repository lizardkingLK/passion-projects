using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Generators;

public class SideWinderMaze : IMaze
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
        List<Position> runs = [];
        DirectionEnum direction;
        for (int i = Width; i < length; i++)
        {
            y = i / Width;
            x = i % Width;
            if (y % 2 == 0 || x % 2 == 0)
            {
                continue;
            }

            next = new Position(y, x);
            direction = GetRandomDirection(next);
            runs.Add(next);
            if (TryGetRightPosition(next, direction, out Position wall)
            || TryGetTopPosition(runs, out wall))
            {
                ClearWall(wall, mapGrid);
            }

            if (next.X == Width - 2)
            {
                runs.Clear();
            }
        }
    }

    private bool TryGetRightPosition(
        Position next,
        DirectionEnum direction,
        out Position wall)
    {
        wall = next + _directionPositions[direction];
        if (direction != DirectionEnum.Right)
        {
            return false;
        }

        return IsValidMapPosition(wall, Height, Width);
    }

    private bool TryGetTopPosition(
        List<Position> runs,
        out Position wall)
    {
        int index = Random.Shared.Next(runs.Count);
        wall = runs[index] + _directionPositions[DirectionEnum.Top];
        runs.Clear();

        return IsValidMapPosition(wall, Height, Width);
    }

    private static void ClearWall(Position wall, Block[,] mapGrid)
    {
        (int y, int x) = wall;
        mapGrid[y, x] = new Block(wall, SymbolSpace);
    }

    private static DirectionEnum GetRandomDirection(Position next)
    {
        if (next.Y == 1)
        {
            return DirectionEnum.Right;
        }

        return _directions[Random.Shared.Next(2)];
    }
}