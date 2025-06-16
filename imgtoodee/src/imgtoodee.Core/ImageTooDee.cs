namespace imgtoodee.Core;

using static Utility;
using static Generator;

public static class ImageTooDee
{
    public static void GenerateImage(string[] args)
    {
        DateTime startTime = DateTime.UtcNow;

        Result<bool> validArgumentsResult = IsValidArguments(args);
        if (validArgumentsResult.Errors != null)
        {
            Environment.ExitCode = 1;
            WriteError(validArgumentsResult.Errors);
            return;
        }

        Result<string> filePathResult = ProcessFilePath(args[0]);
        if (filePathResult.Errors != null)
        {
            Environment.ExitCode = 1;
            WriteError(filePathResult.Errors);
            return;
        }

        Result<char[][]> image2dResult = GetImage2DResult(filePathResult.Data!);
        if (image2dResult.Errors != null)
        {
            Environment.ExitCode = 1;
            WriteError(image2dResult.Errors);
            return;
        }

        WriteSuccess(startTime, DateTime.UtcNow);

        Environment.Exit(0);
    }
}
