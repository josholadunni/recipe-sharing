import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "PLACEHOLDER_DB_DIALECT",
    dialectModule: pg,
    port: process.env.DB_PORT || 5432,
  }
);

export default sequelize;
