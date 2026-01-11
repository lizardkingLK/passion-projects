using treeShaker.Core;

namespace treeShaker.Program;

class Program
{
    static void Main(string[] arguments)
    {
        if (Console.IsInputRedirected)
        {
            TreeShaker.Execute([Console.In.ReadToEnd()]);
        }
        else
        {
            TreeShaker.Execute(arguments);
        }
    }
}
