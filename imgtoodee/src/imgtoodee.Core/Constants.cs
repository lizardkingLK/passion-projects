namespace imgtoodee.Core;

internal static class Constants
{
    internal const char CHAR_HEX_ZERO = '0';
    internal const char CHAR_HEX_ONE = '1';
    internal const char CHAR_HEX_TWO = '2';
    internal const char CHAR_HEX_THREE = '3';
    internal const char CHAR_HEX_FOUR = '4';
    internal const char CHAR_HEX_FIVE = '5';
    internal const char CHAR_HEX_SIX = '6';
    internal const char CHAR_HEX_SEVEN = '7';
    internal const char CHAR_HEX_EIGHT = '8';
    internal const char CHAR_HEX_NINE = '9';
    internal const char CHAR_HEX_A = 'a';
    internal const char CHAR_HEX_B = 'b';
    internal const char CHAR_HEX_C = 'c';
    internal const char CHAR_HEX_D = 'd';
    internal const char CHAR_HEX_E = 'e';
    internal const char CHAR_HEX_F = 'f';
    internal const string HEADER_IMAGE_PNG = "89";
    internal const string HEADER_IMAGE_JPG = "ff";
    internal const string IMAGE_PNG = "PNG";
    internal const string IMAGE_JPG = "JPG";
    internal const string CHUNK_IHDR = "IHDR";
    internal const string ERROR_NO_ARGUMENTS_GIVEN = "error. no arguments given";
    internal const string ERROR_INVALID_FILE_PATH = "error. invalid file path";
    internal const string ERROR_INVALID_FILE_CONTENT = "error. invalid file content";
    internal const string ERROR_INVALID_CHUNK_TYPE = "error. invalid chunk type detected";
    internal const string ERROR_INVALID_BLOCK_TYPE = "error. invalid block type detected";
    internal const string SUCCESS_CONVERTED_IMAGE = "success. image converted. took {0} ns";
}