import Sequelize from "sequelize";
import sequelize from "../db.js";

// import RecipeLike from "./RecipeLike";

import User from "./User.js";
import Like from "./Like.js";
import Recipe from "./Recipe.js";
import RecipeCategory from "./RecipeCategory.js";
import RecipeRecipeCategory from "./RecipeRecipeCategory.js";

const models = { User, Recipe, RecipeCategory, RecipeRecipeCategory, Like };
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

export {
  sequelize,
  Sequelize,
  User,
  Recipe,
  RecipeCategory,
  RecipeRecipeCategory,
  Like,
};

// const syncModels = async () => {
//   await sequelize.sync({});
// };

// const associateModels = async () => {
//   Like.associate();
//   Recipe.associate();
//   User.associate();
//   RecipeCategory.associate();
// };
