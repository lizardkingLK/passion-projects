using mazes.Core;
using mazes.Core.Abstractions;
using mazes.Core.Library.Mazes;

namespace mazes.Program;

class Program
{
    static void Main(string[] args)
    {
        int height;
        int width;
        if (args.Length < 2)
        {
            height = Console.WindowHeight;
            width = Console.WindowWidth;
        }
        else
        {
            height = int.Parse(args[0]);
            width = int.Parse(args[1]);
        }

        if (height % 2 == 0)
        {
            height -= 1;
        }

        if (width % 2 == 0)
        {
            width -= 1;
        }

        IMaze maze = new RBMaze(height, width);
        
        Mazes.Draw(maze);
    }
}
