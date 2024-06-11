import sequelize from "../db";
import Recipe from "./Recipe";
import RecipeCategory from "./RecipeCategory";
import RecipeRecipeCategory from "./RecipeRecipeCategory";
import Like from "./Like";
import RecipeLike from "./RecipeLike";

Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });

Recipe.hasMany(Like);
Like.belongsTo(Recipe);

const syncModels = async () => {
  await sequelize.sync({ force: true });
};

export { syncModels, Recipe, RecipeCategory, RecipeRecipeCategory };
