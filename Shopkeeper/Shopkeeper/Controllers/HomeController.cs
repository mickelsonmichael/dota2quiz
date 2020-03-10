﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Shopkeeper.Business;
using Shopkeeper.Models;
using Shopkeeper.Services.Interfaces;
using System.Diagnostics;
using System.Linq;

namespace Shopkeeper.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> logger;
        private readonly IItemService itemService;
        private readonly QuizOptions quizOptions;

        public HomeController(ILogger<HomeController> logger, IItemService itemService, IOptionsMonitor<QuizOptions> quizOptions)
        {
            this.logger = logger;
            this.itemService = itemService;
            this.quizOptions = quizOptions.CurrentValue;
        }

        public IActionResult Index()
        {
            var model = new Question
            {
                Item = itemService.GetRandom(),
                BaseUrl = quizOptions.RootCdnUrl,
                RecipeUrl = quizOptions.GetRecipeUrl()
            };

            var exclude = model.Item.Components
                            .Select(x => x.Id)
                            .Append(model.Item.Id);

            int numberOfFillers = 7 - model.Item.Components.Count();

            var fillerItems = itemService.GetFillerItems(numberOfFillers, exclude.ToArray());

            model.Options = model.Item.Components.Union(fillerItems);

            logger.LogDebug($"New Question: {model.Item.Id}");

            return View(model);
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
