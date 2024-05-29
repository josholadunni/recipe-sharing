import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import RecipeCategory from "./RecipeCategory.js";
import RecipeRecipeCategory from "./RecipeRecipeCategory.js";

const Recipe = sequelize.define(
  "Recipe",
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
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: false,
    },
  },
  {
    timestamps: true,
  }
);

Recipe.associate = () => {
  Recipe.belongsToMany(RecipeCategory, {
    through: RecipeRecipeCategory,
    foreignKey: "recipeId",
  });
};

export default Recipe;
