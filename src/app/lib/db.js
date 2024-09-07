import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("PLACEHOLDER_DB_NAME", "PLACEHOLDER_DB_DIALECT", "hpharrypot", {
  host: "PLACEHOLDER_DB_HOST",
  dialect: "PLACEHOLDER_DB_DIALECT",
  dialectModule: pg,
  port: 5432,
});

export default sequelize;
