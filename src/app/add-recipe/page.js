import React from "react";
import { RecipeCategory } from "../lib/models/index.js";
import Form from "../components/Form.jsx";
import H1 from "../components/H1.jsx";

export default async function AddRecipes() {
  await RecipeCategory.createCategories();
  const categories = await RecipeCategory.fetchCategories();
  const categoryNames = categories
    .map((category) => {
      const categoryName = category.name;
      const capitalized =
        categoryName.charAt(0).toUpperCase() +
        categoryName.slice(1).toLowerCase();
      return capitalized;
    })
    .sort();

  return (
    <div className="flex justify-center">
      <div className="bg-white w-fit min-h-[600px] mt-10 rounded-t-2xl shadow-md px-32 py-4 relative">
        <H1 text="Add Recipe" className="text-center" />
        <Form categoryNames={categoryNames} />
      </div>
    </div>
  );
}
