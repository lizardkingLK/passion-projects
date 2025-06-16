namespace imgtoodee.Core;

using static Constants;

internal static class Results
{
    internal static readonly Result<bool> ResultEndOfRead = new(false, null);
    internal static readonly Result<bool> ResultHasMoreToRead = new(true, null);
    internal static readonly Result<bool> ErrorInvalidChunkType = new(false, ERROR_INVALID_CHUNK_TYPE);
}