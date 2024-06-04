import React from "react";

import { fetchCategories } from "../lib/models/RecipeCategory.js";

import Input from "../components/Input.jsx";

export default async function AddRecipes() {
  const categories = await fetchCategories();
  const categoryNames = categories.map((category) => category.name);
  console.log(categories);

  return (
    <div>
      <h1 className="text-center text-3xl font-medium pb-3 mt-5">Add Recipe</h1>
      <div>
        <form method="POST" action="/submit-recipe">
          <div>
            <Input
              label="Recipe Name"
              name="rname"
              type="text"
              placeholder="Recipe Name"
            />
            <div class="py-2 flex flex-col w-60 mx-auto">
              <label for="rcslect">Recipe Category</label>
              <br></br>
              <select class="border-2" name="rcselect" required>
                {categoryNames.map((category, key) => {
                  return (
                    <option key={key} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select>
            </div>
            <Input
              label="Image URL"
              name="iurl"
              type="text"
              placeholder="Image URL"
            />
            <Input
              label="Recipe Description"
              name="rdescription"
              type="text"
              placeholder="Recipe Description"
            />
            <Input
              label="Short Recipe Description"
              name="srdescription"
              type="text"
              placeholder="Recipe short Description"
            />
            <Input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
