using System;
using Xunit;
using Shopkeeper.Business;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Linq;

namespace Shopkeeper.Data.Test.Integration
{
    public class ItemsJsonTests
    {
        private List<Item> _items { get; }
        private HashSet<string> _itemIds { get; }

        public ItemsJsonTests()
        {
            var file = File.ReadAllText("items.json");

            _items = JsonConvert.DeserializeObject<QuizItems>(file).Items;
            _itemIds = _items.Select(x => x.Id).ToHashSet();
        }

        [Fact]
        public void AllComponents_HaveMatchingItem()
        {
            foreach (var item in _items.Where(x => x.ComponentNames.Any()))
            {
                Assert.True(item.ComponentNames.All(x => _itemIds.Contains(x)));
            }
        }

        [Fact]
        public void AllComponents_Unique()
        {
            Assert.True(_itemIds.Distinct().Count() == _itemIds.Count);
        }
    }
}
