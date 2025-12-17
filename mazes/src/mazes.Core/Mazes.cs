using mazes.Core.Abstractions;

namespace mazes.Core;

public class Mazes
{
    public static void Draw(IMaze maze)
    {
        maze.Generate();
    }
}
