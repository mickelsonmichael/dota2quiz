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
        private readonly IItemRepository itemRepository;
        private readonly ILogger<ItemService> logger;
        private Random _random;

        private Random Random => _random ?? (_random = new Random());

        public ItemService(IItemRepository itemRepository, ILogger<ItemService> logger)
        {
            this.itemRepository = itemRepository;
            this.logger = logger;
        }

        public Item Get(string itemId) => itemRepository.Get(itemId);

        public IQueryable<Item> GetAll() => itemRepository.GetAll();

        public Item GetRandom(params string[] exclude)
        {
            logger.LogInformation("Getting Random Item");
            logger.LogDebug("Excluding: {0}", string.Join(',', exclude));

            var items = GetAll()
                .Where(x => x.HasComponents && !exclude.Contains(x.Id));

            int index;
            lock (Random)
            {
                index = Random.Next(items.Count());
            }

            logger.LogInformation("Random Item: {0}", items.ElementAt(index));

            return items.ElementAt(index);
        }

        public IEnumerable<Item> GetFillerItems(int numberOfItems, IEnumerable<string> exclude)
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

                logger.LogDebug("Filler Item {0} Added", items[randomIndex]);

                yield return items[randomIndex];
            }
        }
    }
}
