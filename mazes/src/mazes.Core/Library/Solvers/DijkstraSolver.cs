using mazes.Core.Abstractions;
using mazes.Core.Enums;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.MapHelper;
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
            if (current == End)
            {
                break;
            }
        }
    }
}