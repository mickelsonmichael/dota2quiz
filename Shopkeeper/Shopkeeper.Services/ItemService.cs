using Shopkeeper.Business;
using Shopkeeper.Data.Interfaces;
using Shopkeeper.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Extensions.Logging;

namespace Shopkeeper.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository _itemRepository;
        private readonly ILogger<ItemService> _logger;
        private Random _random;

        private Random Random => _random ?? (_random = new Random());

        public ItemService(IItemRepository itemRepository, ILogger<ItemService> logger)
        {
            _itemRepository = itemRepository;
            _logger = logger;
        }

        public Item Get(string itemId) => _itemRepository.Get(itemId);

        public IEnumerable<Item> GetAll() => _itemRepository.GetAll();

        public Item GetRandom(ISet<string> exclude)
        {
            _logger.LogInformation("Getting Random Item");
            _logger.LogDebug("Excluding: {0}", string.Join(',', exclude));

            var items = GetAll()
                .Where(x => x.HasComponents && !exclude.Contains(x.Id));

            int index;
            lock (Random)
            {
                index = Random.Next(items.Count());
            }

            _logger.LogInformation("Random Item: {0}", items.ElementAt(index));

            return items.ElementAt(index);
        }

        public IEnumerable<Item> GetFillerItems(int numberOfItems, ISet<string> exclude)
        {
            var items = GetAll()
                .Where(x => !exclude.Contains(x.Id))
                .ToArray();

            for (int i = 0; i < numberOfItems; i++)
            {
                int randomIndex;
                lock (Random)
                {
                    randomIndex = Random.Next(items.Length);
                }

                _logger.LogDebug("Filler Item {0} Added", items[randomIndex]);

                yield return items[randomIndex];
            }
        }
    }
}
