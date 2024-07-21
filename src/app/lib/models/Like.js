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
  },
  {
    timestamps: true,
  }
);

Like.associate = () => {
  Like.belongsTo(User);
  Like.belongsTo(Recipe);
};

export default Like;
