using Microsoft.Extensions.Options;
using Shopkeeper.Business;
using Shopkeeper.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Shopkeeper.Data
{
    public class JsonItemRepository : IItemRepository
    {
        private readonly IReadOnlyDictionary<string, Item> _items;
        private readonly QuizItems _configItems;
        private readonly ILogger<JsonItemRepository> _logger;

        public JsonItemRepository(IOptionsMonitor<QuizItems> itemsConfig, ILogger<JsonItemRepository> logger)
        {
            _configItems = itemsConfig.CurrentValue;
            _logger = logger;

            _items = LoadJson();
        }

        private Dictionary<string, Item> LoadJson()
        {
            _logger.LogInformation("Parsing Item Json");

            foreach (var item in _configItems.Items.Where(x => x.ComponentNames != null))
            {
                _logger.LogDebug("Populating Components for {0}: {1}", item.Name, string.Join(',', item.ComponentNames));

                item.Components = item.ComponentNames
                    .Select(itemId => _configItems.Items.Single(i => i.Id == itemId))
                    .ToList(); // eager load for easier logging
            }

            _logger.LogDebug("{0} Items Found", _configItems.Items.Count);

            return _configItems.Items
                .ToDictionary(x => x.Id, y => y);
        }

        public IEnumerable<Item> GetAll()
        {
            _logger.LogDebug("Retrieving All Items...");

            return _items
                .Select(x => x.Value);
        }

        public Item Get(string itemId)
        {
            if (string.IsNullOrWhiteSpace(itemId)) throw new ArgumentNullException(nameof(itemId));

            _logger.LogInformation("Getting Item <{0}>", itemId);
            
            return _items[itemId];
        }
    }
}
