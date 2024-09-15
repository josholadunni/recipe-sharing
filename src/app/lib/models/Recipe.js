import { DataTypes } from "sequelize";

export default (sequelize) => {
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
      ingredients: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      method: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      likes: {
        type: DataTypes.INTEGER,
        allowNull: true,
        autoIncrement: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
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

  return Recipe;
};
