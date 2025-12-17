namespace mazes.Core.Abstractions;

public interface IMaze
{
    public int Height { get; }
    public int Width { get; }
    public void Generate();
    public void Print();
    public void Solve();
}