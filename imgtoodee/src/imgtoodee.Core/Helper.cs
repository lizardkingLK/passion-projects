namespace imgtoodee.Core;

using static Utility;
using static Values;

internal static class Helper
{
    internal static void ConvertToHexChar(int currentValue, char[] imageBytes, int index)
    {
        imageBytes[index + 1] = hexCharFromDecimalTracker[currentValue % 16];
        imageBytes[index] = hexCharFromDecimalTracker[currentValue / 16];
    }

    internal static int ConvertToDecimal(char[] chunkBytes)
    {
        int i = chunkBytes.Length - 1;
        int power = 0;
        int decimalValue = 0;
        while (i >= 0)
        {
            decimalValue += GetPowerOfSixteen(power++, 1) * decimalFromHexCharTracker[chunkBytes[i]];
            i--;
        }

        return decimalValue;
    }

    internal static string ConvertToHexString(char[] chunkBytes)
    {
        int i = 0;
        int decimalValue;
        char[] hexStringCharArray = new char[chunkBytes.Length / 2];
        while (i < chunkBytes.Length)
        {
            decimalValue = 0;
            decimalValue += 1 * decimalFromHexCharTracker[chunkBytes[i + 1]];
            decimalValue += 16 * decimalFromHexCharTracker[chunkBytes[i]];
            hexStringCharArray[i / 2] = Convert.ToChar(decimalValue);
            i += 2;
        }

        return string.Join(null, hexStringCharArray);
    }

    internal static int[] ConvertToBitArray(char leftSideHexValue, char rightSideHexValue)
    {
        int[] convertedBits = ConvertToBinary(leftSideHexValue);

        int[] bitArray = new int[8];
        int i;
        for (i = 0; i < 4; i++)
        {
            bitArray[i] = convertedBits[i];
        }

        convertedBits = ConvertToBinary(rightSideHexValue);
        for (i = 0; i < 4; i++)
        {
            bitArray[4 + i] = convertedBits[i];
        }

        return bitArray;
    }

    private static int[] ConvertToBinary(char hexCharacter)
    {
        int hexCharacterInt = ConvertToDecimal([hexCharacter]);
        int[] numberArray = new int[4];
        int index = 3;
        while (hexCharacterInt > 0)
        {
            numberArray[index] = hexCharacterInt % 2;
            hexCharacterInt /= 2;
            index--;
        }

        return numberArray;
    }
}