import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Recipe from "./Recipe.js";

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
      allowNull: false,
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

Like.associate = () => {
  Like.belongsTo(User);
  Like.belongsTo(Recipe);
};

export default Like;
