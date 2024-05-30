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

export async function loadCategories() {
  const categories = [
    "italian",
    "vegetarian",
    "dessert",
    "american",
    "lunch",
    "brunch",
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

export default RecipeCategory;
