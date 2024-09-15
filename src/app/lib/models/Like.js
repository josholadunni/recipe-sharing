import { DataTypes } from "sequelize";

export default (sequelize) => {
  const Like = sequelize.define(
    "Like",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
      },
      RecipeId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "Recipe",
          key: "id",
        },
      },
    },
    {
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["UserId", "RecipeId"],
        },
      ],
    }
  );

  return Like;
};
