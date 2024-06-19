import { Recipe, RecipeCategory, RecipeRecipeCategory } from "./models";

import Like from "./models/Like";

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

export async function fetchRecipeLikes() {
  try {
    const recipes = await Like.findAll();
    return recipes;
  } catch (error) {
    console.error("Couldn't fetch likes", error);
  }
}
