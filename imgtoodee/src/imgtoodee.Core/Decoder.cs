namespace imgtoodee.Core;

using static Constants;
using static Values;
using static Helper;
using static Results;

internal static class Decoder
{
    internal static Result<List<char[]>> GetImageData(string filePath)
    {
        using FileStream imageFile = new(filePath, FileMode.Open);

        Result<bool> imageHeaderResult = ValidateImageHeader(imageFile);
        if (!imageHeaderResult.Data)
        {
            return new Result<List<char[]>>(null, imageHeaderResult.Errors);
        }

        List<char[]> imageData = [];

        Result<bool> imageBodyResult = ValidateImageBody(imageFile, imageData);
        if (!imageBodyResult.Data)
        {
            return new Result<List<char[]>>(imageData, null);
        }

        imageFile.Close();

        return new Result<List<char[]>>(null, imageBodyResult.Errors);
    }

    private static Result<bool> ValidateImageBody(FileStream imageFile, List<char[]> imageData)
    {
        Result<bool> hasMoreChunksResult = ValidateImageBodyChunkLength(imageFile, out int chunkLength);
        if (!hasMoreChunksResult.Data)
        {
            return ResultEndOfRead;
        }

        hasMoreChunksResult = ValidateImageBodyChunkType(imageFile, out ChunkTypeEnum? chunkType);
        if (hasMoreChunksResult.Errors != null || !hasMoreChunksResult.Data || chunkType == null)
        {
            return ErrorInvalidChunkType;
        }

        hasMoreChunksResult = ValidateImageBodyChunkContent(imageFile, chunkLength, chunkType!.Value, imageData);
        if (!hasMoreChunksResult.Data)
        {
            return ResultEndOfRead;
        }

        hasMoreChunksResult = ValidateImageBodyChunkChecksum(imageFile);
        if (!hasMoreChunksResult.Data)
        {
            return ResultEndOfRead;
        }

        return ValidateImageBody(imageFile, imageData);
    }

    private static Result<bool> ValidateImageBodyChunkChecksum(FileStream imageFile)
    {
        Result<int> hasMoreChunksResult = IgnoreImageBytes(imageFile, 4);
        if (hasMoreChunksResult.Data == -1)
        {
            return ResultEndOfRead;
        }

        return ResultHasMoreToRead;
    }

    private static Result<bool> ValidateImageBodyChunkContent(FileStream imageFile, int chunkLength, ChunkTypeEnum chunkType, List<char[]> imageData)
    {
        if (chunkType == ChunkTypeEnum.IHDR && chunkLength == 13)
        {
            return ValidateImageBodyChunkContentIHDR(imageFile);
        }

        if (chunkType == ChunkTypeEnum.IDAT)
        {
            return ValidateImageBodyChunkContentIDAT(imageFile, chunkLength, imageData);
        }

        if (chunkType == ChunkTypeEnum.IEND)
        {
            return ResultEndOfRead;
        }

        return ErrorInvalidChunkType;
    }

    private static Result<bool> ValidateImageBodyChunkContentIDAT(FileStream imageFile, int chunkLength, List<char[]> imageData)
    {
        Result<int> hasMoreChunksResult = ReadImageBytes(imageFile, chunkLength, out char[] imageBytes);
        if (hasMoreChunksResult.Data == -1)
        {
            return ResultEndOfRead;
        }

        imageData.Add(imageBytes);

        return ResultHasMoreToRead;
    }

    private static Result<bool> ValidateImageBodyChunkContentIHDR(FileStream imageFile)
    {
        Result<int> hasMoreChunksResult;
        int content;
        foreach ((string configuration, int size) in chunkIHDRConfiguration)
        {
            hasMoreChunksResult = ReadImageBytes(imageFile, size, out char[] contentArray);
            if (hasMoreChunksResult.Data == -1)
            {
                return ErrorInvalidChunkType;
            }

            content = ConvertToDecimal(contentArray);

            Console.WriteLine("info. {0} is {1}", configuration, content);
        }

        return ResultHasMoreToRead;
    }

    private static Result<bool> ValidateImageBodyChunkType(FileStream imageFile, out ChunkTypeEnum? chunkType)
    {
        chunkType = null;

        Result<int> hasMoreChunksResult = ReadImageBytes(imageFile, 4, out char[] imageBodyChunkType);
        if (hasMoreChunksResult.Data == -1)
        {
            return ErrorInvalidChunkType;
        }

        if (!Enum.TryParse(typeof(ChunkTypeEnum), ConvertToHexString(imageBodyChunkType), out object? chunkTypeParsed))
        {
            return ErrorInvalidChunkType;
        }

        chunkType = (ChunkTypeEnum?)chunkTypeParsed;

        return ResultHasMoreToRead;
    }

    private static Result<bool> ValidateImageBodyChunkLength(FileStream imageFile, out int chunkLength)
    {
        chunkLength = 0;

        Result<int> imageBodyChunkLengthresult = ReadImageBytes(imageFile, 4, out char[] imageBodyChunkLength);
        if (imageBodyChunkLengthresult.Data == -1)
        {
            return ResultEndOfRead;
        }

        chunkLength = ConvertToDecimal(imageBodyChunkLength);

        return ResultHasMoreToRead;
    }

    private static Result<bool> ValidateImageHeader(FileStream imageFile)
    {
        ReadImageBytes(imageFile, 1, out char[] imageBytes);
        if (!imageTypeTracker.TryGetValue(string.Join(null, imageBytes), out _))
        {
            return new Result<bool>(false, ERROR_INVALID_FILE_CONTENT);
        }

        IgnoreImageBytes(imageFile, 7);

        return ResultHasMoreToRead;
    }

    private static Result<int> ReadImageBytes(FileStream imageFile, int size, out char[] imageBytes)
    {
        imageBytes = new char[size * 2];

        int index = 0;
        int currentByteAsInt;
        for (int i = 0; i < size; i++)
        {
            currentByteAsInt = imageFile.ReadByte();
            if (currentByteAsInt == -1)
            {
                return new Result<int>(-1, null);
            }

            ConvertToHexChar(currentByteAsInt, imageBytes, index);

            index += 2;
        }

        // Console.WriteLine("position at {0}", imageFile.Position);

        return new Result<int>(1, null);
    }

    private static Result<int> IgnoreImageBytes(FileStream imageFile, int length)
    {
        int currentByteAsInt;
        for (int i = 0; i < length; i++)
        {
            currentByteAsInt = imageFile.ReadByte();
            if (currentByteAsInt == -1)
            {
                return new Result<int>(-1, null);
            }
        }

        // Console.WriteLine("position at {0}", imageFile.Position);

        return new Result<int>(1, null);
    }
}
