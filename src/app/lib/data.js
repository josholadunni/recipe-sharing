import { Recipe, RecipeCategory, RecipeRecipeCategory, User } from "./models";

import Like from "./models/Like";

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
