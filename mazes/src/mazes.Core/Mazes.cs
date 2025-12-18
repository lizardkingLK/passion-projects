using mazes.Core.Abstractions;
using mazes.Core.State.Cartisean;

namespace mazes.Core;

public class Mazes
{
    private static Block[,]? _mapGrid;

    public static void Draw(IMaze maze)
    {
        maze.Generate(out _mapGrid);
    }

    public static void Solve(ISolver solver)
    {
        solver.Solve(_mapGrid!);
    }
}
