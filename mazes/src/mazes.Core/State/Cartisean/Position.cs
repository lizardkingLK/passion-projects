namespace mazes.Core.State.Cartisean;

public record struct Position(int Y, int X)
{
    public int Y { get; set; } = Y;
    public int X { get; set; } = X;

    public static Position operator +(Position p1, Position p2)
    => new(p1.Y + p2.Y, p1.X + p2.X);

    public static Position operator -(Position p1, Position p2)
    => new(p1.Y - p2.Y, p1.X - p2.X);

    public static Position operator *(Position p, int multiplier)
    => new(p.Y * multiplier, p.X * multiplier);

    public static implicit operator Position((int Y, int X) position)
    => new(position.Y, position.X);

    public static explicit operator (int, int)(Position position)
    => (position.Y, position.X);
}