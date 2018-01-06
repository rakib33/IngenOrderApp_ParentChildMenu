using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace IngenOrderApp.App_Code
{
    public static class EnumerableExtensions
    {
        //parent - child tree
        public static IEnumerable<T> SelectRecursive<T>(this IEnumerable<T> source, Func<T, IEnumerable<T>> selector)
        {
            foreach (var parent in source)
            {
                yield return parent;

                var children = selector(parent);
                foreach (var child in SelectRecursive(children, selector))
                    yield return child;
            }
        }
        //uses
       // var lookup = col.ToLookup(x => x.Parent_Id);
       // var res = lookup[null].SelectRecursive(x => lookup[x.Id]).ToList();
    }
}