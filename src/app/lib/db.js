import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("recipesharingdev", "postgres", "hpharrypot", {
  host: "64.227.44.193",
  dialect: "postgres",
  dialectModule: pg,
  port: 5432,
});

export default sequelize;
