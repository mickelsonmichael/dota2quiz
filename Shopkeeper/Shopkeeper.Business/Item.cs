using System.Collections.Generic;
using System.Linq;

namespace Shopkeeper.Business
{
    public class Item
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string FileName { get; set; }
        public IEnumerable<string> ComponentNames { get; set; }
        public IEnumerable<Item> Components { get; set; }
        public bool HasComponents => Components?.Any() == true;
        public bool RequiresRecipe { get; set; }
    }
}
