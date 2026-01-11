using mazes.Core.Enums;
using mazes.Core.State.Cartisean;

namespace mazes.Core.Shared;

public static class Values
{
    public static readonly Dictionary<DirectionEnum, Position> _directionPositions = new()
    {
        {DirectionEnum.Top, new(-1, 0)},
        {DirectionEnum.Right, new(0, 1)},
        {DirectionEnum.Down, new(1, 0)},
        {DirectionEnum.Left, new(0, -1)},
    };

    public static readonly DirectionEnum[] _directions =
    [
        DirectionEnum.Top,
        DirectionEnum.Right,
        DirectionEnum.Down,
        DirectionEnum.Left,
    ];

    public static readonly char[] _symbols =
    ['!', '$', '%', '^', '&', '*', '(', ')', '+', '-', '_', '='];
}