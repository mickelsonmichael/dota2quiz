using System;
using System.Collections.Generic;
using System.Linq;

namespace Shopkeeper.Services.Extensions
{
    public static class ListExtensions
    {
        public static IEnumerable<T> Randomize<T>(this IEnumerable<T> list)
        {
            var random = new Random();

            return list.OrderBy<T, int>((_) => random.Next());
        }
    }
}