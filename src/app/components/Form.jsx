"use client";

import React, { useState } from "react";
import Input from "../components/Input.jsx";
import { createRecipe } from "../lib/actions.js";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton.jsx";

const initialState = { message: null };

export default function Form(props) {
  const categoryNames = props.categoryNames;
  const [state, formAction] = useFormState(createRecipe, initialState);

  const [ingredients, setIngredients] = useState([{ id: 1 }]);

  const addIngredientField = () => {
    const newId = ingredients.length + 1;
    setIngredients([...ingredients, { id: newId }]);
  };

  return (
    <div>
      <div>
        <form className="text-center" action={formAction}>
          <div className="inline-block text-left ">
            <Input
              label="Recipe Name"
              name="rname"
              type="text"
              placeholder="Recipe Name"
            />
            <div className="py-2 flex flex-col w-60 mx-auto">
              <p>Recipe Category</p>
              {categoryNames.map((category, i) => {
                return (
                  <div key={category}>
                    <label htmlFor={category}>{category}</label>
                    <input
                      className="float-right"
                      type="checkbox"
                      id={`${(category, i)}`}
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
            <Input label="Image" name="file" type="file" accept="images/*" />
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
            <div>
              {ingredients.map((ingredient) => (
                <Input
                  key={ingredient.id}
                  id={`ingredient-${ingredient.id}`}
                  label={ingredient.id === 1 ? "Ingredients" : ""}
                  name={`ingredient`}
                  type="text"
                  placeholder={`Ingredient ${ingredient.id}`}
                />
              ))}
              <div className="text-right">
                <span onClick={addIngredientField}>Add Ingredient</span>
                <br></br>
              </div>
            </div>

            <div className="text-center">
              <SubmitButton />
            </div>
          </div>
        </form>
        {state?.status && <div>{state?.message}</div>}
        {state?.errorMessage && <p>{state?.errorMessage}</p>}
      </div>
    </div>
  );
}

/** TODO: - Link added ingredients fields to actions.js, so that new ingredient entries are added to the DB as a JSON object */
