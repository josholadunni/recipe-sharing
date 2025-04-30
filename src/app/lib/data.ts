"use server";
import {
  Recipe,
  RecipeCategory,
  RecipeRecipeCategory,
  User,
  Like,
} from "./models/index.js";
import { auth } from "../auth";
import { sequelize } from "./models/index.js";
import { unstable_cache } from "next/cache";
import { LikeType } from "./types/Like.js";

export const fetchRecentRecipes = async () => {
  const getCachedRecentRecipes = unstable_cache(
    async () => {
      try {
        const recipes = await Recipe.findAll({
          include: RecipeCategory,
          limit: 10,
          order: [["updatedAt", "DESC"]],
        });
        return JSON.parse(JSON.stringify(recipes));
      } catch (error) {
        console.error("Couldn't fetch recipes", error);
      }
    },
    ["recent-recipes"],
    { revalidate: 60 } // Cache for 1 minute
  );

  return getCachedRecentRecipes();
};

export async function fetchAllRecipes() {
  try {
    const recipes = await Recipe.findAll({
      include: RecipeCategory,
      limit: 10,
    });
    return recipes;
  } catch (error) {
    console.error("Couldn't fetch recipes", error);
  }
}

export const fetchPopularRecipes = async () => {
  const getCachedPopularRecipes = unstable_cache(
    async () => {
      try {
        const recipes = await Recipe.findAll({
          include: [RecipeCategory, Like],
          limit: 10,
        });
        const sortedRecipes = recipes.sort((a, b) => {
          const likesA = a.Likes ? a.Likes.length : 0;
          const likesB = b.Likes ? b.Likes.length : 0;
          return likesB - likesA;
        });
        return JSON.parse(JSON.stringify(sortedRecipes));
      } catch (error) {
        console.error("Couldn't fetch recipes", error);
      }
    },
    ["popular-recipes"],
    { revalidate: 60 } // Cache for 1 minute
  );

  return getCachedPopularRecipes();
};

export async function fetchRecipeCategories() {
  try {
    const categories = await RecipeCategory.findAll({
      order: [["createdAt", "ASC"]],
    });
    return categories;
  } catch (error) {
    console.error("Couldn't fetch categories", error);
  }
}

export async function fetchMyRecipes() {
  const session = await auth();
  if (session) {
    const currentUserId = await findUserIdFromEmail();
    if (currentUserId != undefined) {
      try {
        const recipes = await Recipe.findAll({
          where: { UserId: currentUserId.result },
          include: RecipeCategory,
        });
        return JSON.parse(JSON.stringify(recipes));
      } catch (error) {
        console.error("Couldn't fetch recipes", error);
      }
    } else {
      return [];
    }
  } else {
    return undefined;
  }
}

export async function fetchRecipeLikes(): Promise<LikeType[]> {
  try {
    const likes = await Like.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
        },
      ],
    });
    return JSON.parse(JSON.stringify(likes));
  } catch (error) {
    console.error("Couldn't fetch likes", error);
    return [];
  }
}

export async function fetchLikedRecipes() {
  const session = await auth();
  if (session) {
    const currentUserId = await findUserIdFromEmail();
    if (currentUserId != undefined) {
      try {
        const recipes = await Recipe.findAll({
          include: [
            {
              model: Like,
              where: { UserId: currentUserId.result },
              required: true,
            },
            { model: RecipeCategory, through: { attributes: [] } },
          ],
        });
        return JSON.parse(JSON.stringify(recipes));
      } catch (error) {
        console.error(error);
      }
    } else {
      return [];
    }
  }
}

export async function fetchRecipeById(id) {
  try {
    const recipe = await Recipe.findByPk(id, {
      include: [
        {
          model: RecipeCategory,
          through: { attributes: [] },
        },
      ],
    });
    return JSON.parse(JSON.stringify(recipe));
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

export const findUserIdFromEmail = async (
  inputEmail?: string
): Promise<{ result: number; message: string } | undefined> => {
  // User lookup function (cached for 1 hour)
  const getCachedUser = unstable_cache(
    async (email) => {
      const user = await User.findOne({
        where: { email },
        attributes: ["id"],
      });

      return user
        ? { result: user.id, message: "Email already exists" }
        : undefined;
    },
    ["user-by-email"], // Cache tag for revalidation
    { revalidate: 3600 } // Cache for 1 hour
  );

  //Get the session from the auth object
  const session = await auth();

  //Initialise the email variable. This is what will be used as a parameter in getCachedUser
  let email = undefined;

  //Check to see if currently logged in
  if (!session || !session.user || !session.user.email) {
    if (!inputEmail) {
      return undefined; // No email available
    }
    email = inputEmail;
  } else {
    //Email to search with is the function parameter or if no parameter, the session email
    email = inputEmail || session.user.email;
  }
  //If no input email or session email, return undefined
  if (!email) return undefined;

  // Use the predefined function to get a User from the email. This function is cached to prevent excessive and unnecessary function calling
  return getCachedUser(email);
};

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
  return user[0]?.dataValues.username;
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

// Create a cached version of the category initialization and fetching
export const initAndFetchCategories = unstable_cache(
  async () => {
    await RecipeCategory.createCategories();
    const categories = await RecipeCategory.fetchCategories();
    return categories;
  },
  ["recipe-categories"],
  { revalidate: 3600 } // Cache for 1 hour
);
