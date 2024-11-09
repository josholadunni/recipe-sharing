import { sequelize } from "./src/app/lib/models/index.js";

sequelize
  .sync({ force: true }) // Use force: true to drop and recreate tables
  .then(() => {
    console.log("Database synchronized");
  })
  .catch((error) => {
    console.error("Failed to synchronize database:", error);
  });
