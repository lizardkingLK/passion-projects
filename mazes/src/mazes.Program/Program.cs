using mazes.Core;
using mazes.Core.Abstractions;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Helpers.MazeHelper;
using static mazes.Core.Helpers.ConsoleHelper;
using mazes.Core.State.Common;

namespace mazes.Program;

class Program
{
    static void Main(string[] args)
    {
        Result<(int, int)> dimensionResult = GetDimensions(args);
        if (dimensionResult.HasErrors())
        {
            Error(dimensionResult.Errors!);
        }

        (int height, int width) = dimensionResult.Data;
        GetOpenings(height, width, out Position start, out Position end);
        GetMazeSolver((height, width), (start, end), out IMaze maze, out ISolver solver);

        Mazes.Draw(maze);
        Mazes.Solve(solver);

        WriteAt(height + 1, 0, '\0', ConsoleColor.White);
    }
}
