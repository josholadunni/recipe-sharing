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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    short_description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      autoIncrement: false,
    },
    isDummy: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

Recipe.associate = () => {
  console.log("Associating Recipe with RecipeCategory");
  Recipe.belongsToMany(RecipeCategory, {
    through: RecipeRecipeCategory,
    foreignKey: "recipeId",
  });
};

export async function fetchRecipes() {
  Recipe.sync();
  return await Recipe.findAll();
}

export default Recipe;
