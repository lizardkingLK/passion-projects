using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ConsoleHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Constants;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Solvers;

public class FloodFillSolver : ISolver
{
    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }

    public void Solve(Block[,] mapGrid)
    {
        GetDistances(
            mapGrid,
            out int[,] distances);
        GetShortestPath(
            distances,
            out List<Position> path);
        Print(path);
    }

    private static void Print(List<Position> path)
    {
        int y;
        int x;
        foreach (Position position in path)
        {
            (y, x) = position;
            WriteAt(y, x, SymbolTrail, ConsoleColor.Red);
            Thread.Sleep(DurationPathTrail);
        }
    }

    private void GetShortestPath(
        int[,] distances,
        out List<Position> path)
    {
        path = [];
        Position[] openings = [Start, End];
        bool[,] visited = new bool[
            distances.GetLength(0),
            distances.GetLength(1)];

        Position neighbor;
        Position current = Start;
        Position closestNeighbor = current;
        path.Add(current);
        int currentDistance;

        int y;
        int x;
        while (current != End)
        {
            currentDistance = distances[current.Y, current.X];
            foreach (DirectionEnum direction in _directions)
            {
                neighbor = current + _directionPositions[direction];
                (y, x) = neighbor;
                if (!IsValidMapPosition(neighbor, openings, Height, Width)
                || visited[y, x])
                {
                    continue;
                }

                if (distances[y, x] < currentDistance)
                {
                    closestNeighbor = neighbor;
                }
            }

            path.Add(closestNeighbor);
            visited[closestNeighbor.Y, closestNeighbor.X] = true;
            current = closestNeighbor;
        }
    }

    private void GetDistances(
        Block[,] mapGrid,
        out int[,] distances)
    {
        Position[] openings = [Start, End];
        ((ISolver)this).GetVisitedAndDistanceGrids(
            mapGrid,
            out bool[,] visited,
            out distances);

        Queue<(Position, int)> queue = [];
        Position current = End;
        queue.Enqueue((current, 0));
        distances[current.Y, current.X] = 0;

        Position neighbor;
        int y;
        int x;
        int distance;
        while (queue.TryDequeue(out (Position, int) value))
        {
            (current, distance) = value;
            foreach (DirectionEnum direction in _directions)
            {
                neighbor = current + _directionPositions[direction];
                (y, x) = neighbor;
                if (!IsValidMapPosition(neighbor, openings, Height, Width)
                || visited[y, x])
                {
                    continue;
                }

                distances[y, x] = distance + 1;
                queue.Enqueue((neighbor, distance + 1));
            }

            (y, x) = current;
            visited[y, x] = true;
            if (current == Start)
            {
                break;
            }
        }
    }
}