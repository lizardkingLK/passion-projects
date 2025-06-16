namespace imgtoodee.Core;

using static Constants;

internal static class Values
{
    internal static readonly Dictionary<int, char> hexCharFromDecimalTracker = new()
    {
        {0, CHAR_HEX_ZERO},
        {1, CHAR_HEX_ONE},
        {2, CHAR_HEX_TWO},
        {3, CHAR_HEX_THREE},
        {4, CHAR_HEX_FOUR},
        {5, CHAR_HEX_FIVE},
        {6, CHAR_HEX_SIX},
        {7, CHAR_HEX_SEVEN},
        {8, CHAR_HEX_EIGHT},
        {9, CHAR_HEX_NINE},
        {10, CHAR_HEX_A},
        {11, CHAR_HEX_B},
        {12, CHAR_HEX_C},
        {13, CHAR_HEX_D},
        {14, CHAR_HEX_E},
        {15, CHAR_HEX_F},
    };

    internal static readonly Dictionary<char, int> decimalFromHexCharTracker = new()
    {
        {CHAR_HEX_ZERO, 0},
        {CHAR_HEX_ONE, 1},
        {CHAR_HEX_TWO, 2},
        {CHAR_HEX_THREE, 3},
        {CHAR_HEX_FOUR, 4},
        {CHAR_HEX_FIVE, 5},
        {CHAR_HEX_SIX, 6},
        {CHAR_HEX_SEVEN, 7},
        {CHAR_HEX_EIGHT, 8},
        {CHAR_HEX_NINE, 9},
        {CHAR_HEX_A, 10},
        {CHAR_HEX_B, 11},
        {CHAR_HEX_C, 12},
        {CHAR_HEX_D, 13},
        {CHAR_HEX_E, 14},
        {CHAR_HEX_F, 15},
    };

    internal static readonly Dictionary<string, string> imageTypeTracker = new()
    {
        {HEADER_IMAGE_PNG, IMAGE_PNG},
        {HEADER_IMAGE_JPG, IMAGE_JPG},
    };

    internal static readonly (string, int)[] chunkIHDRConfiguration =
    [
        new ("image width", 4),
        new ("image height", 4),
        new ("image bit depth", 1),
        new ("image color type", 1),
        new ("image compression method", 1),
        new ("image filter method", 1),
        new ("image interlace method", 1),
    ];
}