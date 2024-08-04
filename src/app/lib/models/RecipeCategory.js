import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import RecipeRecipeCategory from "./RecipeRecipeCategory.js";
import Recipe from "./Recipe.js";

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

export async function fetchCategories() {
  RecipeCategory.sync();
  return await RecipeCategory.findAll();
}

export async function createCategories() {
  const categories = [
    "italian",
    "vegetarian",
    "dessert",
    "american",
    "lunch",
    "brunch",
    "dinner",
    "breakfast",
    "budget-friendly",
  ];

  const mappedCategories = await Promise.all(
    categories.map(async (category) => {
      const existingCategory = await RecipeCategory.findOne({
        where: { name: category },
      });
      if (!existingCategory) {
        return await RecipeCategory.create({ name: category });
      }
      return existingCategory;
    })
  );

  return mappedCategories;
}

RecipeCategory.associate = () => {
  RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });
};

export default RecipeCategory;
