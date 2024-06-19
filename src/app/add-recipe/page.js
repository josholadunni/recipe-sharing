import React from "react";
import { fetchCategories } from "../lib/models/RecipeCategory.js";
import { createCategories } from "../lib/models/RecipeCategory.js";
import Form from "../components/Form.jsx";

export default async function AddRecipes() {
  createCategories();
  const categories = await fetchCategories();
  const categoryNames = categories.map((category) => category.name);

  return <Form categoryNames={categoryNames} />;
}
