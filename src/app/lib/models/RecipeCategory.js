import { DataTypes } from "sequelize";

export default (sequelize) => {
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

  RecipeCategory.fetchCategories = async function () {
    await this.sync();
    return await this.findAll();
  };

  RecipeCategory.createCategories = async function () {
    const categories = [
      "vegetarian",
      "vegan",
      "meat",
      "quick & easy",
      "desserts",
      "breakfast",
    ];

    const mappedCategories = await Promise.all(
      categories.map(async (category) => {
        const categoryName =
          category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
        const [existingCategory] = await this.findOrCreate({
          where: { name: categoryName },
        });
        return existingCategory;
      })
    );

    return mappedCategories;
  };

  return RecipeCategory;
};
