namespace mazes.Core.Helpers;

public static class ArithmeticHelper
{
    public static int GetAbsoluteValue(int value)
    {
        int bitMask = value >> 31;
        value = (value ^ bitMask) - bitMask;

        return value;
    }
}