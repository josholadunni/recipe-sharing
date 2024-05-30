import express from "express";
import next from "next";
import sequelize from "./src/app/lib/db.js";
import User from "./src/app/lib/models/User.js";
import Recipe from "./src/app/lib/models/Recipe.js";
import RecipeCategory from "./src/app/lib/models/RecipeCategory.js";
import RecipeRecipeCategory from "./src/app/lib/models/RecipeRecipeCategory.js";
import { loadCategories } from "./src/app/lib/models/RecipeCategory.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  Recipe.associate();
  RecipeCategory.associate();

  sequelize
    .sync()
    .then(() => {
      loadCategories();
      console.log("Database & tables created!");
    })
    .catch((error) => {
      console.error("Unable to create the table : ", error);
    });

  // All other Next.js requests
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
