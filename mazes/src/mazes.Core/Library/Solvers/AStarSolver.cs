using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.ArithmeticHelper;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Shared.Values;

namespace mazes.Core.Library.Solvers;

public class AStarSolver : ISolver
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
        ((ISolver)this).GetShortestPath(
            trailPath,
            out Stack<Position> path);
        ((ISolver)this).Print(path);
    }

    private void GetSearchedPaths(
        Block[,] mapGrid,
        out List<(Position position, DirectionEnum direction)> trailPath)
    {
        Position[] openings = [Start, End];
        ((ISolver)this).GetVisitedAndDistanceGrids(
            mapGrid,
            out bool[,] visited,
            out int[,] distances);

        trailPath = [];
        PriorityQueue<(Position, int, DirectionEnum), int> queue = new();

        Position current = Start;
        int gDistance = 0;
        int hDistance = GetHeuristicDistance(current, End);
        int currentDistance = gDistance + hDistance;

        DirectionEnum currentDirection = DirectionEnum.Right;
        queue.Enqueue((current, gDistance, currentDirection), currentDistance);

        Position neighbor;
        int distance;
        int y;
        int x;
        while (queue.TryDequeue(
            out (Position, int, DirectionEnum) value,
            out _))
        {
            (current, gDistance, currentDirection) = value;
            foreach (DirectionEnum direction in _directions)
            {
                neighbor = current + _directionPositions[direction];
                (y, x) = neighbor;
                if (!IsValidMapPosition(neighbor, openings, Height, Width)
                || visited[y, x])
                {
                    continue;
                }

                hDistance = GetHeuristicDistance(current, End);
                distance = gDistance + 1 + hDistance;
                if (distance < distances[y, x])
                {
                    distances[y, x] = distance;
                    queue.Enqueue((neighbor, gDistance + 1, direction), distance);
                }
            }

            visited[current.Y, current.X] = true;
            trailPath.Add((current, currentDirection));
            Helpers.ConsoleHelper.WriteAt(current.Y, current.X, Shared.Constants.SymbolWall, ConsoleColor.White);
            if (current == End)
            {
                break;
            }
        }
    }
}