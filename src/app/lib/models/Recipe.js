import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Like from "./Like.js";
import User from "./User.js";
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
  Recipe.belongsTo(User);
  Recipe.hasMany(Like);
  Recipe.belongsToMany(User, { through: Like });
  Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
};

export default Recipe;
