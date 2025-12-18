namespace mazes.Core.Helpers;

public static class ListHelper
{
    public static void Shuffle<T>(T[] list)
    {
        int length = list.Length;
        int randomIndex;
        for (int i = 0; i < length; i++)
        {
            randomIndex = Random.Shared.Next(length);
            (list[i], list[randomIndex]) = (list[randomIndex], list[i]);
        }
    }
}