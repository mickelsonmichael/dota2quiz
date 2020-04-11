using System;
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

        public override string ToString()
        {
            if (Id == null)
                throw new InvalidOperationException($"Item incorrectly configured. No <{nameof(Id)}>");

            if (Name == null) 
                throw new InvalidOperationException($"Item incorrectly configured for item {Id}. No <{nameof(Name)}");
                
            return $"{Name} <{Id}>";
        }
    }
}
