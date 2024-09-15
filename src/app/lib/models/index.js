import sequelize from "../db.js";
import UserModel from "./User.js";
import RecipeModel from "./Recipe.js";
import RecipeCategoryModel from "./RecipeCategory.js";
import LikeModel from "./Like.js";
import RecipeRecipeCategoryModel from "./RecipeRecipeCategory.js";

const User = UserModel(sequelize);
const Recipe = RecipeModel(sequelize);
const RecipeCategory = RecipeCategoryModel(sequelize);
const Like = LikeModel(sequelize);
const RecipeRecipeCategory = RecipeRecipeCategoryModel(sequelize);

// Setup associations
import setupAssociations from "./setupAssociations.js";

setupAssociations({
  User,
  Recipe,
  RecipeCategory,
  Like,
  RecipeRecipeCategory,
});

export { sequelize, User, Recipe, RecipeCategory, RecipeRecipeCategory, Like };
