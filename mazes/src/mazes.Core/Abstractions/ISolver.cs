using mazes.Core.State.Cartisean;

namespace mazes.Core.Abstractions;

public interface ISolver
{
    public int Height { get; init; }
    public int Width { get; init; }
    public Position Start { get; init; }
    public Position End { get; init; }
    public void Solve(Block[,] mapGrid);
}