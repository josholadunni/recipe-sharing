import React from "react";
import { RecipeCategory } from "../lib/models/index.js";
import Form from "../components/Form.jsx";
import H1 from "../components/H1.jsx";
import { unstable_cache } from "next/cache";

// Create a cached version of the category initialization and fetching
const initAndFetchCategories = unstable_cache(
  async () => {
    await RecipeCategory.createCategories();
    const categories = await RecipeCategory.fetchCategories();
    return categories;
  },
  ["recipe-categories"],
  { revalidate: 3600 } // Cache for 1 hour
);

export default async function AddRecipes() {
  const categories = await initAndFetchCategories();

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
