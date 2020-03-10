using Shopkeeper.Business;
using Shopkeeper.Data.Interfaces;
using Shopkeeper.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Shopkeeper.Services
{
    public class ItemService : IItemService
    {
        private readonly IItemRepository itemRepository;
        private Random _random;

        private Random Random => _random ?? (_random = new Random());

        public ItemService(IItemRepository itemRepository)
        {
            this.itemRepository = itemRepository;
        }

        public Item Get(string itemId) => itemRepository.Get(itemId);

        public IQueryable<Item> GetAll() => itemRepository.GetAll();

        public Item GetRandom(params string[] exclude)
        {
            var items = GetAll()
                .Where(x => x.HasComponents && !exclude.Contains(x.Id));

            var index = Random.Next(items.Count());

            return items.ElementAt(index);
        }

        public IEnumerable<Item> GetFillerItems(int numberOfItems, params string[] exclude)
        {
            var items = GetAll()
                .Where(x => !exclude.Contains(x.Id));

            for (int i = 0; i < numberOfItems; i++)
            {
                yield return items.ElementAt(Random.Next(items.Count()));
            }
        }
    }
}
