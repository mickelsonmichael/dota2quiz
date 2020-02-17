namespace Shopkeeper.Business
{
    public class QuizOptions
    {
        public string RootCdnUrl { get; set; }
        public string RecipeFileName { get; set; }
        public string GetRecipeUrl() => RootCdnUrl + RecipeFileName;
    }
}
