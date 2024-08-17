import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("PLACEHOLDER_DB_NAME", "PLACEHOLDER_DB_DIALECT", "hpharrypot", {
  host: "PLACEHOLDER_DB_HOST",
  dialect: "PLACEHOLDER_DB_DIALECT",
  dialectModule: pg,
  port: 5432,
});

export default sequelize;

// import config from "../../../config/config";

// const env = process.env.NODE_ENV || "development";
// const dbConfig = config[env];

// const sequelize = new Sequelize(
//   dbConfig.database,
//   dbConfig.username,
//   dbConfig.password,
//   {
//     host: dbConfig.host,
//     dialect: dbConfig.dialect,
//   }
// );

// const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

// export default db;
