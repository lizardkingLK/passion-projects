using mazes.Core;

namespace mazes.Program;

class Program
{
    static void Main(string[] args)
    {
        Mazes.Draw(int.Parse(args[0]), int.Parse(args[1]));
    }
}
