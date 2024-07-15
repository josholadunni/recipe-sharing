import React from "react";
import { fetchCategories } from "../lib/models/RecipeCategory.js";
import { createCategories } from "../lib/models/RecipeCategory.js";
import RecipeForm from "../components/RecipeForm.jsx";
import H1 from "../components/H1.jsx";
import { auth } from "../auth.js";

export default async function AddRecipes() {
  createCategories();
  const categories = await fetchCategories();
  const categoryNames = categories.map((category) => category.name);
  return (
    <div>
      <H1 text="Add Recipe" />
      <RecipeForm categoryNames={categoryNames} />
    </div>
  );
}
