using System.Collections.Generic;
using Shopkeeper.Business;
using System.Linq;

namespace Shopkeeper.Models
{
    public class Question
    {
        public Item Item { get; }
        public string RecipeUrl { get;  }
        public string BaseUrl { get; }
        public int Streak { get; }
        public List<Item> Options { get; }

        public string GetUrl(Item item) => BaseUrl + item.FileName;

        public Question(Item item, string recipeUrl, string baseUrl, int streak = 0)
        {
            this.Item = item;
            this.Options = item.Components.ToList();
            this.RecipeUrl = recipeUrl;
            this.BaseUrl = baseUrl;
            this.Streak = streak;
        }
    }
}
