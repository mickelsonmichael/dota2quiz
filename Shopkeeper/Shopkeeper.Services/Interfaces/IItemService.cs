using Shopkeeper.Business;
using System.Linq;

namespace Shopkeeper.Services.Interfaces
{
    public interface IItemService
    {
        Item Get(string itemId);
        IQueryable<Item> GetAll();
        Item GetRandom(params string[] exclude);
    }
}
