import { Recipe, RecipeCategory, RecipeRecipeCategory } from "./models";

Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });

export default async function fetchRecentRecipes() {
  try {
    const recipes = await Recipe.findAll({
      include: RecipeCategory,
    });
    return recipes;
  } catch (error) {
    console.error("Couldn't fetch recipes", error);
  }
}
