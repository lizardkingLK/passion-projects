using mazes.Core.Abstractions;
using mazes.Core.Library.Generators;
using mazes.Core.Library.Solvers;
using mazes.Core.State.Cartisean;

namespace mazes.Core.Helpers;

public static class MazeHelper
{
    public static void GetMazeSolver(
        (int height, int width) dimensions,
        (Position start, Position end) openings,
        out IMaze maze,
        out ISolver solver)
    {
        (int height, int width) = dimensions;
        (Position start, Position end) = openings;

        solver = new DijkstraSolver
        {
            Height = height,
            Width = width,
            Start = start,
            End = end,
        };

        maze = new RecursiveBacktrackerMaze
        {
            Height = height,
            Width = width,
            Start = start,
            End = end,
        };
    }
}