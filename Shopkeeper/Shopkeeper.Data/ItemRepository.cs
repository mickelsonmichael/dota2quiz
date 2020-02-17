using Microsoft.Extensions.Options;
using Shopkeeper.Business;
using Shopkeeper.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Shopkeeper.Data
{
    public class ItemRepository : IItemRepository
    {
        private readonly IReadOnlyDictionary<string, Item> Items;
        private readonly QuizItems configItems;

        public ItemRepository(IOptionsMonitor<QuizItems> itemsConfig)
        {
            configItems = itemsConfig.CurrentValue;
            Items = LoadJson();
        }

        private Dictionary<string, Item> LoadJson()
        {
            foreach (var item in configItems.Items.Where(x => x.ComponentNames != null))
            {
                item.Components = configItems.Items.Where(x => item.ComponentNames.Contains(x.Id));
            }

            return configItems.Items
                .ToDictionary(x => x.Id, y => y);
        }

        public IQueryable<Item> GetAll()
        {
            return Items
                .Select(x => x.Value)
                .AsQueryable();
        }

        public Item Get(string itemId)
        {
            if (string.IsNullOrWhiteSpace(itemId)) throw new ArgumentNullException(nameof(itemId));

            return Items[itemId];
        }
    }
}
