import sequelize from "./src/app/lib/db.js";

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while synchronizing the database:", error);
  } finally {
    await sequelize.close();
  }
}

syncDatabase();
