using mazes.Core;
using mazes.Core.Abstractions;
using mazes.Core.State.Cartisean;
using static mazes.Core.Helpers.MapHelper;
using static mazes.Core.Helpers.MazeHelper;
using static mazes.Core.Helpers.ConsoleHelper;

namespace mazes.Program;

class Program
{
    static void Main(string[] args)
    {
        GetDimensions(args, out int height, out int width);
        GetOpenings(height, width, out Position start, out Position end);
        GetMazeSolver((height, width), (start, end), out IMaze maze, out ISolver solver);

        Mazes.Draw(maze);
        Mazes.Solve(solver);

        WriteAt(height + 1, 0, '\0', ConsoleColor.White);
    }
}
