using Shopkeeper.Business;
using System.Linq;

namespace Shopkeeper.Data.Interfaces
{
    public interface IItemRepository
    {
        Item Get(string itemId);
        IQueryable<Item> GetAll();
    }
}
