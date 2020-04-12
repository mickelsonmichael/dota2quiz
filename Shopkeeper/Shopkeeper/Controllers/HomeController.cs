using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Shopkeeper.Business;
using Shopkeeper.Models;
using Shopkeeper.Services.Interfaces;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace Shopkeeper.Controllers
{
    public class HomeController : Controller
    {
        private const int NumberOfOptions = 11;
        private readonly ILogger<HomeController> _logger;
        private readonly IItemService _itemService;
        private readonly QuizOptions _quizOptions;

        public HomeController(ILogger<HomeController> logger, IItemService itemService, IOptionsMonitor<QuizOptions> quizOptions)
        {
            _logger = logger;
            _itemService = itemService;
            _quizOptions = quizOptions.CurrentValue;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Question(string previous = null, int streak = 0)
        {
            _logger.LogInformation("New question requested");
            
            var model = new Question(
                                _itemService.GetRandom(new HashSet<string> { previous }), 
                                _quizOptions.GetRecipeUrl(), 
                                _quizOptions.RootCdnUrl,
                                streak);
            
            var exclude = model.Item.Components
                            .Select(x => x.Id)
                            .Append(model.Item.Id)
                            .ToHashSet();

            int numberOfFillers = NumberOfOptions - model.Item.Components.Count();

            var fillerItems = _itemService.GetFillerItems(numberOfFillers, exclude);

            model.Options.AddRange(fillerItems);

            _logger.LogDebug("New Question for <{0}>\nAnswers: {1}", 
                model.Item.Name, 
                string.Join(',', model.Item.ComponentNames));

            return PartialView("_Question", model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
