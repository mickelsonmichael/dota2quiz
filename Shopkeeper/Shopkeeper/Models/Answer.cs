using System.Collections.Generic;
using System.Linq;
using Shopkeeper.Business;

namespace Shopkeeper.Models
{
    public class Answer
    {
        public string ItemName { get; }
        public string ItemId { get; }
        public string ItemUrl { get; }
        public List<(string itemName, string itemUrl)> Components { get; }

        public Answer(Item item, string rootUrl, string recipeUrl)
        {
            ItemName = item.Name;
            ItemId = item.Id;
            ItemUrl = $"{rootUrl}{item.FileName}";
            
            Components = item.Components
                            .Select(x => (x.Name, $"{rootUrl}{x.FileName}"))
                            .ToList();

            if (item.RequiresRecipe)
                Components.Add(("Recipe", recipeUrl));
        }
    }
}