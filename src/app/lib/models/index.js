import sequelize from "../db";
import Recipe from "./Recipe";
import RecipeCategory from "./RecipeCategory";
import RecipeRecipeCategory from "./RecipeRecipeCategory";
import Like from "./Like";
import RecipeLike from "./RecipeLike";
import User from "./User";

const syncModels = async () => {
  await sequelize.sync({ force: true });
};

const associateModels = async () => {
  Like.associate();
  Recipe.associate();
  User.associate();
  RecipeCategory.associate();
};

export {
  syncModels,
  associateModels,
  Recipe,
  RecipeCategory,
  RecipeRecipeCategory,
};
