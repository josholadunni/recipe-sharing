import sequelize from "../db.js";

export default (sequelize) => {
  const RecipeRecipeCategory = sequelize.define("RecipeRecipeCategories");
  return RecipeRecipeCategory;
};
