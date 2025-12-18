using static mazes.Core.Shared.Constants;

namespace mazes.Core.State.Cartisean;

public record struct Block(Position Position, char Symbol)
{
    public Position Position { get; set; } = Position;
    public char Symbol { get; set; } = Symbol;
    public int Color { get; } = GetProperty(Symbol);

    private static int GetProperty(char symbol)
    {
        if (symbol == SymbolWall)
        {
            return (int)ConsoleColor.Green;
        }
        else if (symbol == SymbolTrail)
        {
            return (int)ConsoleColor.Red;
        }

        return (int)ConsoleColor.White;
    }
}