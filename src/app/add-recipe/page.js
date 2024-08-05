import React from "react";
import { fetchCategories } from "../lib/models/RecipeCategory.js";
import { createCategories } from "../lib/models/RecipeCategory.js";
import Form from "../components/Form.jsx";
import H1 from "../components/H1.jsx";

export default async function AddRecipes() {
  await createCategories();
  const categories = await fetchCategories();
  const categoryNames = categories
    .map((category) => {
      const categoryName = category.name;
      const capitalized =
        categoryName.charAt(0).toUpperCase() + categoryName.slice(1);
      return capitalized;
    })
    .sort();

  return (
    <div>
      <H1 text="Add Recipe" />
      <Form categoryNames={categoryNames} />
    </div>
  );
}
