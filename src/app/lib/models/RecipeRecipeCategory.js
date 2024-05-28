import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const RecipeRecipeCategory = sequelize.define(
  "RecipeRecipeCategory",
  {
    recipeId: {
      type: DataTypes.INTEGER,
      references: {
        model: "Recipes",
        key: "id",
      },
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      references: {
        model: "RecipeCategories",
        key: "id",
      },
      primaryKey: true,
    },
  },
  {
    timestamps: true,
  }
);

export default RecipeRecipeCategory;
