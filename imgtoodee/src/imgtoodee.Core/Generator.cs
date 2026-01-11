namespace imgtoodee.Core;

using System;
using static Constants;
using static Helper;

internal static class Generator
{
    internal static Result<List<char[]>> GetImage2DResult(List<char[]> imageData)
    {
        Result<(bool, int[]?)> imageDataHeaderResult;
        Result<(bool, BTypeEnum, int[])> dataBlockHeaderResult;
        foreach (char[] imageDataRow in imageData)
        {
            Console.WriteLine("\ninfo. image idat chunk found");
            imageDataHeaderResult = ProcessChunkHeaderData(imageDataRow);
            if (!imageDataHeaderResult.Data.Item1)
            {
                return new Result<List<char[]>>(null, imageDataHeaderResult.Errors);
            }

            dataBlockHeaderResult = ProcessDataBlockHeaderData(imageDataRow, 6);
            if (dataBlockHeaderResult.Data.Item2 == BTypeEnum.ReservedOrError)
            {
                return new Result<List<char[]>>(null, ERROR_INVALID_BLOCK_TYPE);
            }

            if (dataBlockHeaderResult.Data.Item2 == BTypeEnum.NoCompression)
            {
                ProcessDataBlockWithNoCompression(imageDataRow);
            }
            else if (dataBlockHeaderResult.Data.Item2 == BTypeEnum.CompressionWithFixedHuffmanCodes)
            {
                ProcessDataBlockWithFixedHuffmanCodes(imageDataRow, dataBlockHeaderResult.Data.Item3);
            }
            else if (dataBlockHeaderResult.Data.Item2 == BTypeEnum.CompressionWithDynamicHuffmanCodes)
            {
                ProcessDataBlockWithDynamicHuffmanCodes(imageDataRow, dataBlockHeaderResult.Data.Item3);
            }

            ProcessChunkChecksumData(imageDataRow);
        }

        return new Result<List<char[]>>([], null);
    }

    private static void ProcessDataBlockWithDynamicHuffmanCodes(char[] imageDataRow, int[] currentBitArray)
    {
        Console.WriteLine(string.Join(null, currentBitArray));

        int length = imageDataRow.Length;
        int i;
        char[] currentHexArray;
        for (i = 8; i < length; i += 2)
        {
            currentHexArray = [imageDataRow[i - 2], imageDataRow[i - 1]];
            Console.WriteLine(string.Join(null, currentHexArray) + " = " + ConvertToDecimal(currentHexArray));
        }
    }

    private static void ProcessDataBlockWithFixedHuffmanCodes(char[] imageDataRow, int[] currentBitArray)
    {
        Console.WriteLine(string.Join(null, currentBitArray));

        int length = imageDataRow.Length;
        int i;
        char[] currentHexArray;
        for (i = 8; i < length; i += 2)
        {
            currentHexArray = [imageDataRow[i - 2], imageDataRow[i - 1]];
            Console.WriteLine(string.Join(null, currentHexArray) + " = " + ConvertToDecimal(currentHexArray));
        }
    }

    private static void ProcessDataBlockWithNoCompression(char[] imageDataRow)
    {
        int length = imageDataRow.Length;

        // TODO: LEN byte

        // TODO: NLEN byte

        int i;
        char[] currentHexArray;
        for (i = 14; i < length; i += 2)
        {
            currentHexArray = [imageDataRow[i - 2], imageDataRow[i - 1]];
            Console.WriteLine(string.Join(null, currentHexArray) + " = " + ConvertToDecimal(currentHexArray));
        }
    }

    private static void ProcessChunkChecksumData(char[] imageDataRow)
    {
        Console.WriteLine("\n\nchecksum bytes");
        int i;
        int length = imageDataRow.Length;
        char[] currentHexArray;
        for (i = length - 4; i < length; i++)
        {
            currentHexArray = [imageDataRow[i - 2], imageDataRow[i - 1]];
            Console.WriteLine(string.Join(null, currentHexArray) + " = " + ConvertToDecimal(currentHexArray));
        }
    }

    private static Result<(bool, BTypeEnum, int[])> ProcessDataBlockHeaderData(char[] imageDataRow, int index)
    {
        int[] bitArray = ConvertToBitArray(imageDataRow[index - 2], imageDataRow[index - 1]);

        bool bFinal = bitArray[7] == 1;
        Console.WriteLine("\nis final block (BFINAL)    = {0}", bFinal);

        int firstBit = bitArray[5];
        int secondBit = bitArray[6];
        BTypeEnum bType = BTypeEnum.ReservedOrError;
        if (firstBit == 0 && secondBit == 0)
        {
            bType = BTypeEnum.NoCompression;
        }
        else if (firstBit == 0 && secondBit == 1)
        {
            bType = BTypeEnum.CompressionWithFixedHuffmanCodes;
        }
        else if (firstBit == 1 && secondBit == 0)
        {
            bType = BTypeEnum.CompressionWithDynamicHuffmanCodes;
        }

        Console.WriteLine("\nblock type (BTYPE)         = {0}", bType);

        return new Result<(bool, BTypeEnum, int[])>((bFinal, bType, bitArray), null);
    }

    private static Result<(bool, int[]?)> ProcessChunkHeaderData(char[] imageDataRow)
    {
        char[] currentHexArray = [imageDataRow[0], imageDataRow[1]];
        int cmfValue = ConvertToDecimal(currentHexArray);
        Result<(bool, int[]?)> currentHeaderResult = ProcessDataChunkHeaderCMFByte(currentHexArray[0], currentHexArray[1]);
        if (!currentHeaderResult.Data.Item1)
        {
            return new Result<(bool, int[]?)>((false, null), currentHeaderResult.Errors);
        }

        currentHexArray = [imageDataRow[2], imageDataRow[3]];
        int flagsValue = ConvertToDecimal(currentHexArray);
        currentHeaderResult = ProcessDataChunkHeaderFlagsByte(currentHexArray[0], currentHexArray[1]);
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

    private static Result<(bool, int[]?)> ProcessDataChunkHeaderFlagsByte(char leftSideHexValue, char rightSideHexValue)
    {
        int[] convertedBits = ConvertToBitArray(leftSideHexValue, rightSideHexValue);
        if (convertedBits[2] != 0)
        {
            return new Result<(bool, int[]?)>((false, null), "error. invalid flag byte was found");
        }

        return new Result<(bool, int[]?)>((true, convertedBits), null);
    }

    private static Result<(bool, int[]?)> ProcessDataChunkHeaderCMFByte(char leftSideHexValue, char rightSideHexValue)
    {
        if (leftSideHexValue != '7' || rightSideHexValue != '8')
        {
            return new Result<(bool, int[]?)>((false, null), "error. invalid idat cmf bytes found");
        }

        int[] convertedBits = ConvertToBitArray(leftSideHexValue, rightSideHexValue);

        return new Result<(bool, int[]?)>((true, convertedBits), null);
    }

    private enum BTypeEnum
    {
        NoCompression,
        CompressionWithFixedHuffmanCodes,
        CompressionWithDynamicHuffmanCodes,
        ReservedOrError,
    }
}