import sequelize from "../db";
import Recipe from "./Recipe";
import RecipeCategory from "./RecipeCategory";
import RecipeRecipeCategory from "./RecipeRecipeCategory";

Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });

const syncModels = async () => {
  await sequelize.sync({ force: true });
};

export { syncModels, Recipe, RecipeCategory, RecipeRecipeCategory };
