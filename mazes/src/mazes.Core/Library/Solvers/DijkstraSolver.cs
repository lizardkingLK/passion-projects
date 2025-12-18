using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Solvers;

public class DijkstraSolver : ISolver
{
    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }

    public void Solve(Block[,] mapGrid)
    {
        GetSearchedPaths(
            mapGrid,
            out List<(Position position, DirectionEnum direction)> trailPath);
        GetShortestPath(
            trailPath,
            out Stack<Position> path);
        Print(path);
    }

    private static void Print(Stack<Position> path)
    {
        while (path.TryPop(out Position current))
        {
            WriteAt(current.Y, current.X, SymbolTrail, ConsoleColor.Red);
            Thread.Sleep(20);
        }
    }

    private void GetShortestPath(
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

    private void GetSearchedPaths(
        Block[,] mapGrid,
        out List<(Position position, DirectionEnum direction)> trailPath)
    {
        Position[] openings = [Start, End];
        GetVisitedAndDistanceGrids(
            mapGrid,
            out bool[,] visited,
            out int[,] distances);

        trailPath = [];
        PriorityQueue<(Position, DirectionEnum), int> queue = new();
        Position current = Start;
        queue.Enqueue((current, DirectionEnum.Right), 0);

        Position neighbor;
        int y;
        int x;
        DirectionEnum currentDirection;
        while (queue.TryDequeue(out (Position, DirectionEnum) value, out int distance))
        {
            (current, currentDirection) = value;
            foreach (DirectionEnum direction in _directions)
            {
                neighbor = current + _directionPositions[direction];
                (y, x) = neighbor;
                if (!IsValidMapPosition(neighbor, openings, Height, Width)
                || visited[y, x])
                {
                    continue;
                }

                if (distance + 1 < distances[y, x])
                {
                    distances[y, x] = distance + 1;
                    queue.Enqueue((neighbor, direction), distance + 1);
                }
            }

            visited[current.Y, current.X] = true;
            trailPath.Add((current, currentDirection));
        }
    }

    private void GetVisitedAndDistanceGrids(
        Block[,] mapGrid,
        out bool[,] visited,
        out int[,] distances)
    {
        visited = new bool[Height, Width];
        distances = new int[Height, Width];

        int length = Height * Width;
        int y;
        int x;
        for (int i = 0; i < length; i++)
        {
            y = i / Width;
            x = i % Width;
            if (mapGrid[y, x].Symbol == SymbolWall)
            {
                visited[y, x] = true;
            }

            distances[y, x] = int.MaxValue;
        }
    }
}