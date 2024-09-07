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

export async function fetchAllRecipes() {
  try {
    const recipes = await Recipe.findAll({
      include: RecipeCategory,
    });
    return recipes;
  } catch (error) {
    console.error("Couldn't fetch recipes", error);
  }
}

export async function fetchRecipeCategories() {
  try {
    const categories = await RecipeCategory.findAll();
    return categories;
  } catch (error) {
    console.error("Couldn't fetch categories", error);
  }
}

export async function fetchMyRecipes() {
  const session = await auth();
  const currentUserId = await findUserIdFromEmail(session.user.email);
  try {
    const recipes = await Recipe.findAll({
      where: { UserId: currentUserId.result },
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
  if (user.length > 0) {
    return { result: user[0].dataValues.id, message: "Email already exists" };
  } else {
    return undefined;
  }
}

export async function findUserFromUsername(username) {
  const user = await User.findAll({
    where: { username: username },
  });
  if (user.length > 0) {
    return { result: user[0].dataValues, message: "Username already exists" };
  } else {
    return undefined;
  }
}

export async function fetchAllUsers() {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    console.error("Couldn't fetch users", error);
  }
}

export async function findUsername(username) {
  const user = await User.findAll({
    where: { username: username },
  });
  if (user.length > 0) {
    return {
      result: user[0].dataValues.username,
      message: "Username already exists",
    };
  } else {
    return undefined;
  }
}

export async function findUsernameFromEmail(email) {
  const user = await User.findAll({
    where: { email: email },
  });
  return user[0].dataValues.username;
}

export async function fetchRecipesByCategoryId(id) {
  try {
    const recipeIds = await Recipe.findAll({
      attributes: ["id"],
      include: [
        {
          model: RecipeCategory,
          where: { id: id },
          through: { attributes: [] },
        },
      ],
    }).then((recipes) => recipes.map((recipe) => recipe.id));

    const recipes = await Recipe.findAll({
      where: {
        id: recipeIds,
      },
      include: [
        {
          model: RecipeCategory,
          through: { attributes: [] },
        },
      ],
    });

    return recipes;
  } catch (error) {
    console.error("Couldn't fetch recipes", error);
    throw error;
  }
}

export async function fetchRecipesByUserId(id) {
  try {
    const recipes = await Recipe.findAll({
      include: [
        {
          model: User,
          where: { id },
          attributes: [],
        },
        RecipeCategory,
      ],
    });

    return recipes;
  } catch (error) {
    console.error("Couldn't fetch recipes", error);
    throw error;
  }
}

export async function fetchCategoryIdByCategoryName(name) {
  const id = await RecipeCategory.findOne({
    where: { name: name },
  });
  return id;
}

export async function fetchRecipeCategoriesByRecipeId(id) {
  const categories = await RecipeRecipeCategory.findAll({
    where: { RecipeId: id },
  });
  return categories;
}
