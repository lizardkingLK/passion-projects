


namespace mazes.Core;

public class Mazes
{
    public record struct Position(int Y, int X)
    {
        public int Y { get; set; } = Y;
        public int X { get; set; } = X;

        public static Position operator +(Position p1, Position p2)
        => new(p1.Y + p2.Y, p1.X + p2.X);

        public static Position operator -(Position p1, Position p2)
        => new(p1.Y - p2.Y, p1.X - p2.X);
    }

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

            return (int)ConsoleColor.White;
        }
    }

    public enum DirectionEnum
    {
        Top,
        Right,
        Down,
        Left,
    }

    public const char SymbolWall = '#';
    public const char SymbolSpace = ' ';

    private static readonly Dictionary<DirectionEnum, Position> _directionPositions = new()
    {
        {DirectionEnum.Top, new(-1, 0)},
        {DirectionEnum.Right, new(0, 1)},
        {DirectionEnum.Down, new(1, 0)},
        {DirectionEnum.Left, new(0, -1)},
    };

    private static readonly DirectionEnum[] _directions =
    [
        DirectionEnum.Top,
        DirectionEnum.Right,
        DirectionEnum.Down,
        DirectionEnum.Left,
    ];

    private static Block[,] _mapGrid;

    private static bool[,]? _visitedGrid;

    public static void Draw(int height, int width)
    {
        ClearConsole();
        //
        DrawBoard(height, width);
        //
        DrawPath([(height - 2, 0), (1, width - 1)], height, width);
        //
        WriteAt(height, 0, '\0', ConsoleColor.White);
    }

    private static void DrawPath((int, int)[] mainPositions, int height, int width)
    {
        Stack<Position> positions = new();

        int y;
        int x;
        int length = mainPositions.Length;
        for (int i = 0; i < length; i++)
        {
            (y, x) = mainPositions[i];
            _visitedGrid![y, x] = true;
            positions.Push(new(y, x));
            WriteAt(y, x, SymbolSpace, ConsoleColor.White);
        }

        Position current;
        Position stepped;
        Position next;
        DirectionEnum direction;
        Position wall;
        int directionsCount = _directions.Length;
        while (positions.Count != 0)
        {
            current = positions.Pop();
            Shuffle(_directions);
            for (int i = 0; i < directionsCount; i++)
            {
                direction = _directions[i];
                stepped = _directionPositions[direction];
                next = current + stepped;
                if (!IsValidMapPosition(next, height, width))
                {
                    continue;
                }

                if (_visitedGrid![next.Y, next.X])
                {
                    continue;
                }

                positions.Push(next);
                _visitedGrid![next.Y, next.X] = true;

                direction = GetReversedDirection(direction);
                wall = next + _directionPositions[direction];
                if (!IsValidMapPosition(wall, height, width))
                {
                    continue;
                }

                WriteAt(wall.Y, wall.X, SymbolSpace, ConsoleColor.White);
                _visitedGrid![wall.Y, wall.X] = true;
            }

            Thread.Sleep(20);
        }
    }

    private static void Shuffle<T>(T[] list)
    {
        int length = list.Length;
        int randomIndex;
        for (int i = 0; i < length; i++)
        {
            randomIndex = Random.Shared.Next(length);
            (list[i], list[randomIndex]) = (list[randomIndex], list[i]);
        }
    }

    private static DirectionEnum GetReversedDirection(DirectionEnum direction)
    {
        if (direction == DirectionEnum.Top)
        {
            return DirectionEnum.Down;
        }
        else if (direction == DirectionEnum.Right)
        {
            return DirectionEnum.Left;
        }
        else if (direction == DirectionEnum.Down)
        {
            return DirectionEnum.Top;
        }
        else
        {
            return DirectionEnum.Left;
        }
    }

    private static bool IsValidMapPosition(Position position, int height, int width)
    {
        return position.Y > 0
        && position.Y < height - 1
        && position.X > 0
        && position.X < width - 1;
    }

    private static void DrawInOut((int, int) inPosition, (int, int) outPosition)
    {
        WriteAt(inPosition, SymbolSpace, ConsoleColor.White);
        WriteAt(outPosition, SymbolSpace, ConsoleColor.White);
    }

    private static void WriteAt((int, int) position, char symbol, ConsoleColor color)
    {
        (int y, int x) = position;
        Console.SetCursorPosition(x, y);
        Console.ForegroundColor = color;
        Console.Write(symbol);
        Console.ResetColor();
    }

    private static void WriteLine()
    {
        Console.WriteLine();
    }

    private static void DrawBoard(int height, int width)
    {
        _visitedGrid = new bool[height, width];
        _mapGrid = new Block[height, width];

        int length = height * width;
        int y;
        int x;
        char symbol;
        ConsoleColor color;
        Position position;
        for (int i = 0; i < length; i++)
        {
            y = i / width;
            x = i % width;
            symbol = SymbolWall;
            color = ConsoleColor.Green;

            position = new(y, x);
            _visitedGrid[y, x] = false;
            _mapGrid[y, x] = new Block(position, symbol);
            WriteAt(y, x, symbol, color);
        }
    }

    private static void ClearConsole()
    {
        Console.Clear();
    }

    private static void WriteAt(int y, int x, char symbol, ConsoleColor color)
    {
        Console.SetCursorPosition(x, y);
        Console.ForegroundColor = color;
        Console.Write(symbol);
        Console.ResetColor();
    }
}
