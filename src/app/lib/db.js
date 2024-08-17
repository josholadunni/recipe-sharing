import pg from "pg";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("recipesharingdev", "postgres", "hpharrypot", {
  host: "64.227.44.193",
  dialect: "postgres",
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
