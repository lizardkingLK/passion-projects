using mazes.Core.State.Cartisean;

namespace mazes.Core.Abstractions;

public interface IMaze
{
    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }
    public void Generate(out Block[,] mapGrid);
    public void Print(Block[,] mapGrid);
}