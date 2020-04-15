using Shopkeeper.Business;
using System.Collections.Generic;

namespace Shopkeeper.Data.Interfaces
{
    public interface IItemRepository
    {
        Item Get(string itemId);
        IEnumerable<Item> GetAll();
    }
}
