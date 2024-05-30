import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("recipe_sharing", "PLACEHOLDER_DB_DIALECT", "hpharrypot", {
  host: "localhost",
  dialect: "PLACEHOLDER_DB_DIALECT",
  dialectModule: pg,
  port: 5433,
});

export default sequelize;

export async function fetchPopularRecipes() {}

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
