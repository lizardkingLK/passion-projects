namespace imgtoodee.Core;

using static Helper;

internal static class Generator
{
    internal static Result<List<char[]>> GetImage2DResult(List<char[]> imageData)
    {
        Result<(bool, int[]?)> imageDataHeaderResult;
        foreach (char[] imageDataRow in imageData)
        {
            Console.WriteLine("\ninfo. image idat chunk found");
            imageDataHeaderResult = ProcessImageHeaderData(imageDataRow);
            if (!imageDataHeaderResult.Data.Item1)
            {
                return new Result<List<char[]>>(null, imageDataHeaderResult.Errors);
            }

            ProcessImageBodyData(imageDataRow);
        }

        return new Result<List<char[]>>([], null);
    }

    private static void ProcessImageBodyData(char[] imageDataRow)
    {
        int i;
        int length = imageDataRow.Length;
        Console.WriteLine("\ndata bytes");
        char[] currentHexArray;
        for (i = 6; i < length; i += 2)
        {
            currentHexArray = [imageDataRow[i - 2], imageDataRow[i - 1]];
            Console.Write(string.Join(null, currentHexArray) + " = " + ConvertToDecimal(currentHexArray) + ", ");
        }

        Console.WriteLine("\n\nchecksum bytes");
        for (i = length - 4; i < length; i++)
        {
            currentHexArray = [imageDataRow[i - 2], imageDataRow[i - 1]];
            Console.WriteLine(string.Join(null, currentHexArray) + " = " + ConvertToDecimal(currentHexArray));
        }
    }

    private static Result<(bool, int[]?)> ProcessImageHeaderData(char[] imageDataRow)
    {
        char[] currentHexArray = [imageDataRow[0], imageDataRow[1]];
        int cmfValue = ConvertToDecimal(currentHexArray);
        Result<(bool, int[]?)> currentHeaderResult = ProcessImageDataHeaderCMFByte(currentHexArray[0], currentHexArray[1]);
        if (!currentHeaderResult.Data.Item1)
        {
            return new Result<(bool, int[]?)>((false, null), currentHeaderResult.Errors);
        }

        currentHexArray = [imageDataRow[2], imageDataRow[3]];
        int flagsValue = ConvertToDecimal(currentHexArray);
        currentHeaderResult = ProcessImageDataHeaderFlagsByte(currentHexArray[0], currentHexArray[1]);
        if (!currentHeaderResult.Data.Item1)
        {
            return new Result<(bool, int[]?)>((false, null), currentHeaderResult.Errors);
        }

        if ((cmfValue * 256 + flagsValue) % 31 != 0)
        {
            return new Result<(bool, int[]?)>((false, null), "error. invalid idat header bytes were found");
        }

        return new Result<(bool, int[]?)>((true, null), null);
    }

    private static Result<(bool, int[]?)> ProcessImageDataHeaderFlagsByte(char leftSideHexValue, char rightSideHexValue)
    {
        int[] convertedBits = ConvertToBitArray(leftSideHexValue, rightSideHexValue);
        if (convertedBits[2] != 0)
        {
            return new Result<(bool, int[]?)>((false, null), "error. invalid flag byte was found");
        }

        return new Result<(bool, int[]?)>((true, convertedBits), null);
    }

    private static Result<(bool, int[]?)> ProcessImageDataHeaderCMFByte(char leftSideHexValue, char rightSideHexValue)
    {
        if (leftSideHexValue != '7' || rightSideHexValue != '8')
        {
            return new Result<(bool, int[]?)>((false, null), "error. invalid idat cmf bytes found");
        }

        int[] convertedBits = ConvertToBitArray(leftSideHexValue, rightSideHexValue);

        return new Result<(bool, int[]?)>((true, convertedBits), null);
    }
}