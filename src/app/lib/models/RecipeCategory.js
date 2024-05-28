import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Recipe from "./Recipe.js";
import RecipeRecipeCategory from "./RecipeRecipeCategory.js";

const RecipeCategory = sequelize.define(
  "RecipeCategory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

RecipeCategory.associate = () => {
  RecipeCategory.belongsToMany(Recipe, {
    through: RecipeRecipeCategory,
    foreignKey: "categoryId",
  });
};

export default RecipeCategory;
