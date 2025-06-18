namespace imgtoodee.Core;

using static Constants;

internal static class Utility
{
    internal static Result<bool> IsValidArguments(string[] args)
    {
        if (args.Length > 0)
        {
            return new Result<bool>(true, null);
        }

        return new Result<bool>(false, ERROR_NO_ARGUMENTS_GIVEN);
    }

    internal static Result<string> ProcessFilePath(string filePath)
    {
        try
        {
            string filePathArgument = filePath;
            string currentDirectory = Directory.GetCurrentDirectory();
            bool isFullyQualified = Path.IsPathFullyQualified(filePathArgument);
            bool hasExtension = Path.HasExtension(filePathArgument);

            if (!isFullyQualified)
            {
                filePath = Path.GetFullPath(Path.Join(currentDirectory, filePath));
            }

            if (!hasExtension)
            {
                string? matchingFirstFile = Directory.GetFiles(filePath, "*", SearchOption.TopDirectoryOnly)
                .Select(matchingFilePath => Path.GetFileName(matchingFilePath))
                .FirstOrDefault(fileName => fileName.StartsWith(
                    filePathArgument,
                    StringComparison.CurrentCultureIgnoreCase));

                filePath = Path.Join(currentDirectory, matchingFirstFile ?? string.Empty);
            }

            if (!File.Exists(filePath))
            {
                return new Result<string>(null, ERROR_INVALID_FILE_PATH);
            }

            return new Result<string>(filePath, null);
        }
        catch (Exception)
        {
            throw;
        }
    }

    internal static void WriteInfo(string format, params string[] items)
    {
        Console.ForegroundColor = ConsoleColor.Cyan;
        Console.WriteLine(string.Format(format, items));
        Console.ForegroundColor = ConsoleColor.White;
    }

    internal static void WriteError(string message)
    {
        Console.ForegroundColor = ConsoleColor.Red;
        Console.WriteLine(message);
        Console.ForegroundColor = ConsoleColor.White;
    }

    internal static void WriteSuccess(DateTime start, DateTime end)
    {
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine(string.Format(
            SUCCESS_CONVERTED_IMAGE,
            (end - start).TotalNanoseconds));
        Console.ForegroundColor = ConsoleColor.White;
    }

    internal static int GetPowerOfSixteen(int power, int current)
    {
        if (power == 0)
        {
            return current;
        }

        return GetPowerOfSixteen(power - 1, current * 16);
    }
}