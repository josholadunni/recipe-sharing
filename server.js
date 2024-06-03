import express from "express";
import next from "next";
import sequelize from "./src/app/lib/db.js";
import Recipe from "./src/app/lib/models/Recipe.js";
import RecipeCategory from "./src/app/lib/models/RecipeCategory.js";
import { createCategories } from "./src/app/lib/models/RecipeCategory.js";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  Recipe.associate();
  RecipeCategory.associate();

  sequelize
    .sync({ force: true })
    .then(() => {
      createCategories();
      console.log("Database & tables created!");
      // console.log(Object.keys(Recipe.prototype)); //Check the methods assigned to the Recipe model
    })
    .catch((error) => {
      console.error("Unable to create the table : ", error);
    });

  // All other Next.js requests
  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.post("/submit-recipe", async (req, res) => {
    Recipe.sync();
    try {
      const newRecipe = await Recipe.create({
        name: req.body.rname,
        imageURL: req.body.iurl,
        description: req.body.rdescription,
        short_description: req.body.srdescription,
        isDummy: true,
      });
      const categories = await RecipeCategory.findAll({
        where: { name: req.body.rcselect },
      });
      try {
        await newRecipe.addRecipeCategories(categories);
      } catch (error) {
        console.error("Couldn't assign category ", error);
      }

      console.log(`${req.body.rname} recipe created!`);
      res.redirect("add-recipe");
    } catch (error) {
      console.error("Couldn't create recipe ", error);
    }
  });

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
