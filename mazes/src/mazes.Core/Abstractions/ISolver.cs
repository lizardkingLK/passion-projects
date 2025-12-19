using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Abstractions;

public interface ISolver
{
    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }

    public void Solve(Block[,] mapGrid);

    public void GetVisitedAndDistanceGrids(
        Block[,] mapGrid,
        out bool[,] visited,
        out int[,] distances)
    {
        int height = mapGrid.GetLength(0);
        int width = mapGrid.GetLength(1);

        visited = new bool[height, width];
        distances = new int[height, width];

        int length = height * width;
        int y;
        int x;
        for (int i = 0; i < length; i++)
        {
            y = i / width;
            x = i % width;
            if (mapGrid[y, x].Symbol == SymbolWall)
            {
                visited[y, x] = true;
            }

            distances[y, x] = int.MaxValue;
        }
    }

    public void GetShortestPath(
        List<(Position position, DirectionEnum direction)> trailPath,
        out Stack<Position> path)
    {
        path = new();

        (Position current, DirectionEnum currentDirection) = trailPath
        .FirstOrDefault(
            item => item.position.Y == End.Y && item.position.X == End.X);
        int y;
        int x;
        while (true)
        {
            (y, x) = current;
            path.Push(current);
            if (y == Start.Y && x == Start.X)
            {
                break;
            }

            currentDirection = GetReversedDirection(currentDirection)!.Value;
            current += _directionPositions[currentDirection];
            (y, x) = current;
            (current, currentDirection) = trailPath.FirstOrDefault(
                item => item.position.Y == y && item.position.X == x);
        }
    }

    public void Print(Stack<Position> path)
    {
        while (path.TryPop(out Position current))
        {
            WriteAt(current.Y, current.X, SymbolTrail, ConsoleColor.Red);
            Thread.Sleep(DurationPathTrail);
        }
    }
}