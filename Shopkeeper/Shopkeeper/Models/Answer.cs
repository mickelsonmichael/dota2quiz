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
        public string RootUrl { get; }
        public string RecipeUrl { get; }
        public bool ItemRequiresRecipe { get; }
        public List<(string itemName, string itemUrl)> Components { get; }

        public Answer(Item item, string rootUrl, string recipeUrl)
        {
            ItemName = item.Name;
            ItemId = item.Id;
            ItemUrl = $"{RootUrl}{item.FileName}";
            RecipeUrl = $"{RootUrl}{recipeUrl}";
            ItemRequiresRecipe = item.RequiresRecipe;
            
            Components = item.Components
                            .Select(x => (x.Name, $"{RootUrl}{x.FileName}"))
                            .ToList();
        }
    }
}