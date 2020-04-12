using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Shopkeeper.Business;
using Shopkeeper.Models;
using Shopkeeper.Services.Interfaces;
using System.Diagnostics;
using System.Linq;

namespace Shopkeeper.Controllers
{
    public class QuestionController : Controller
    {
        private const int NumberOfOptions = 11;
        private readonly ILogger<QuestionController> logger;
        private readonly IItemService itemService;
        private readonly QuizOptions quizOptions;

        public QuestionController(ILogger<QuestionController> logger, 
            IItemService itemService, 
            IOptionsMonitor<QuizOptions> quizOptions)
        {
            this.logger = logger;
            this.itemService = itemService;
            this.quizOptions = quizOptions.CurrentValue;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Question(string previous = null, int streak = 0)
        {
            logger.LogInformation("New question requested");
            
            var model = new Question(itemService.GetRandom(previous), 
                                quizOptions.GetRecipeUrl(), 
                                quizOptions.RootCdnUrl,
                                streak);
            
            var exclude = model.Item.Components
                            .Select(x => x.Id)
                            .Append(model.Item.Id);

            int numberOfFillers = NumberOfOptions - model.Item.Components.Count();

            var fillerItems = itemService.GetFillerItems(numberOfFillers, exclude);

            model.Options.AddRange(fillerItems);

            logger.LogDebug("New Question for <{0}>\nAnswers: {1}", 
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
