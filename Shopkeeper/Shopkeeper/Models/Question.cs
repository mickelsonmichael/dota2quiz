using Shopkeeper.Business;

namespace Shopkeeper.Models
{
    public class Question
    {
        public Item Item { get; set; }
        public string RecipeUrl { get; set; }
        public string BaseUrl { get; set; }
        public string GetUrl(Item item) => BaseUrl + item.FileName;
    }
}
