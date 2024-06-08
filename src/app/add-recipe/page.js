import React from "react";

import { fetchCategories } from "../lib/models/RecipeCategory.js";

import Input from "../components/Input.jsx";

export default async function AddRecipes() {
  const categories = await fetchCategories();
  const categoryNames = categories.map((category) => category.name);

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
            <div className="py-2 flex flex-col w-60 mx-auto">
              <p>Recipe Category</p>
              {categoryNames.map((category, key) => {
                console.log({ category });
                return (
                  <div>
                    <label htmlFor={category} key={key}>
                      {category}
                    </label>
                    <input
                      className="float-right"
                      type="checkbox"
                      key={key}
                      id={`${category}${key}`}
                      name="rcselect"
                      value={category}
                    ></input>
                  </div>
                );
              })}

              {/* <label htmlFor="rcslect">Recipe Category</label>
              <br></br>
              <select className="border-2" name="rcselect" required multiple>
                {categoryNames.map((category, key) => {
                  return (
                    <option key={key} value={category}>
                      {category}
                    </option>
                  );
                })}
              </select> */}
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
