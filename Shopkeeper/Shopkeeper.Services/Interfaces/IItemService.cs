using Shopkeeper.Business;
using System.Collections.Generic;
using System.Linq;

namespace Shopkeeper.Services.Interfaces
{
    public interface IItemService
    {
        Item Get(string itemId);
        IEnumerable<Item> GetAll();
        IEnumerable<Item> GetFillerItems(int numberOfItems, IEnumerable<string> exclude);
        Item GetRandom(params string[] exclude);
    }
}
