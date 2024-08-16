import { Recipe, RecipeCategory, RecipeRecipeCategory, User } from "./models";
import Like from "./models/Like";
import { auth } from "../auth";

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

export async function fetchMyRecipes() {
  const session = await auth();
  const currentUserId = await findUserIdFromEmail(session.user.email);
  try {
    const recipes = await Recipe.findAll({
      where: { UserId: currentUserId },
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

export async function fetchRecipeById(id) {
  try {
    const recipe = await Recipe.findByPk(id);
    return recipe;
  } catch (error) {
    console.error("Couldn't fetch recipe", error);
  }
}

export async function fetchAllRecipeIds() {
  try {
    const recipeIds = await Recipe.findAll({
      attributes: ["id"],
    });
    return recipeIds;
  } catch (error) {
    console.error("Couldn't fetch recipe IDs", error);
  }
}

export async function findUserIdFromEmail(email) {
  const user = await User.findAll({
    where: { email: email },
  });
  if (user.length > 1) {
    return user[0].dataValues.id;
  } else {
    return undefined;
  }
}

export async function findUsernameFromEmail(email) {
  const user = await User.findAll({
    where: { email: email },
  });
  console.log(user[0]);
  console.log(user[0].dataValues.username);
  return user[0].dataValues.username;
}
