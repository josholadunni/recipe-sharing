import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Recipe from "./Recipe.js";
import Like from "./Like.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

User.associate = () => {
  User.hasMany(Recipe);
  User.hasMany(Like);
  User.belongsToMany(Recipe, { through: Like, as: "LikedRecipes" });
};

export default User;
