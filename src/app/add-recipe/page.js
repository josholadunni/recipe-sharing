import React from "react";
import { fetchCategories } from "../lib/models/RecipeCategory.js";
import { createCategories } from "../lib/models/RecipeCategory.js";
import Form from "../components/Form.jsx";
import H1 from "../components/H1.jsx";
import { syncModels } from "../lib/models/index.js";
// import { associateModels } from "../lib/models/index.js";

export default async function AddRecipes() {
  await createCategories();
  // associateModels();
  const categories = await fetchCategories();
  const categoryNames = categories.map((category) => category.name);

  return (
    <div>
      <H1 text="Add Recipe" />
      <Form categoryNames={categoryNames} />
    </div>
  );
}
