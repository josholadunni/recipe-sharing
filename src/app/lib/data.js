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
  console.log(session);
  try {
    const recipes = await Recipe.findAll({
      where: username == session.user.username,
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

export async function findUserIdFromEmail(email) {
  const user = await User.findAll({
    where: { email: email },
  });
  return user[0].dataValues.id;
}

export async function findUsernameFromEmail(email) {
  const user = await User.findAll({
    where: { email: email },
  });
  console.log(user[0]);
  console.log(user[0].dataValues.username);
  return user[0].dataValues.username;
}
