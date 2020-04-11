using Microsoft.Extensions.Options;
using Shopkeeper.Business;
using Shopkeeper.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Shopkeeper.Data
{
    public class ItemRepository : IItemRepository
    {
        private readonly IReadOnlyDictionary<string, Item> Items;
        private readonly QuizItems configItems;
        private readonly ILogger<ItemRepository> logger;

        public ItemRepository(IOptionsMonitor<QuizItems> itemsConfig, ILogger<ItemRepository> logger)
        {
            configItems = itemsConfig.CurrentValue;
            this.logger = logger;

            Items = LoadJson();
        }

        private Dictionary<string, Item> LoadJson()
        {
            logger.LogInformation("Parsing Item Json");

            foreach (var item in configItems.Items.Where(x => x.ComponentNames != null))
            {
                logger.LogDebug("Populating Components for {0}: {1}", item.Name, string.Join(',', item.ComponentNames));

                item.Components = item.ComponentNames
                    .Select(itemId => configItems.Items.Single(i => i.Id == itemId))
                    .ToList(); // eager load for easier logging
            }

            logger.LogDebug("{0} Items Found", configItems.Items.Count);

            return configItems.Items
                .ToDictionary(x => x.Id, y => y);
        }

        public IQueryable<Item> GetAll()
        {
            logger.LogDebug("Retrieving All Items...");

            return Items
                .Select(x => x.Value)
                .AsQueryable();
        }

        public Item Get(string itemId)
        {
            if (string.IsNullOrWhiteSpace(itemId)) throw new ArgumentNullException(nameof(itemId));

            logger.LogInformation("Getting Item <{0}>", itemId);
            
            return Items[itemId];
        }
    }
}
