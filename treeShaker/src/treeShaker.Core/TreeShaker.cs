using treeShaker.Core.Processors;
using treeShaker.Core.State;
using treeShaker.Core.Validators;
using static treeShaker.Core.Helpers.ApplicationHelper;

namespace treeShaker.Core;

public class TreeShaker
{
    public static void Execute(string[] arguments)
    {
        Result<string> pathResult = PathValidator.Validate(arguments);
        if (pathResult.HasErrors)
        {
            HandleError(pathResult.Errors);
        }

        Result<string> processResult = PathProcessor.Process(pathResult.Value);
        if (processResult.HasErrors)
        {
            HandleError(processResult.Errors);
        }

        HandleSuccess(processResult.Value);
    }
}
