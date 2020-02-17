using Shopkeeper.Business;
using Shopkeeper.Data.Interfaces;
using Shopkeeper.Services.Interfaces;
using System;
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
    }
}
