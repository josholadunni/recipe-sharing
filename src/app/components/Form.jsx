"use client";

import React, { useState, useEffect } from "react";
import Input from "../components/Input.jsx";
import ListInput from "../components/ListInput.jsx";
import { createRecipe } from "../lib/actions.js";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton.jsx";
import { redirect } from "next/navigation.js";

const initialState = { message: null };

export default function Form(props) {
  const categoryNames = props.categoryNames;
  const [state, formAction] = useFormState(createRecipe, initialState);

  const [ingredients, setIngredients] = useState([{ id: 1 }]);
  const [checkedCategories, setCheckedCategory] = useState([]);

  const addIngredientField = () => {
    const newId = ingredients.length + 1;
    setIngredients([...ingredients, { id: newId }]);
  };

  const removeIngredientField = (id) => {
    if (id !== 1) {
      setIngredients(ingredients.filter((ingredient) => ingredient.id !== id));
    }
  };

  const [method, setMethodStep] = useState([{ id: 1 }]);

  const addMethodField = () => {
    const newId = method.length + 1;
    setMethodStep([...method, { id: newId }]);
  };

  const removeMethodField = (id) => {
    if (id !== 1) {
      setMethodStep(method.filter((step) => step.id !== id));
    }
  };

  const addCategoryClick = (e) => {
    if (checkedCategories.includes(e.target.value)) {
      setCheckedCategory(
        checkedCategories.filter((category) => category !== e.target.value)
      );
    } else {
      setCheckedCategory((prevCategories) => {
        const updatedCategories = [...prevCategories, e.target.value];

        return updatedCategories;
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        e.key === "Enter" &&
        e.target.nodeName === "INPUT" &&
        e.target.type === "text"
      ) {
        e.preventDefault();
        if (e.target.name === "ingredient") {
          addIngredientField();
        } else if (e.target.name === "method") {
          addMethodField();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [addIngredientField, addMethodField]);

  return (
    <div>
      <div>
        <form autoComplete="off" className="text-center" action={formAction}>
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
                      onClick={(e) => addCategoryClick(e)}
                      className="category-select float-right"
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
            {checkedCategories?.length > 5 && <p>Too many categories</p>}
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
                <ListInput
                  key={ingredient.id}
                  id={`ingredient-${ingredient.id}`}
                  label={ingredient.id === 1 ? "Ingredients" : ""}
                  name={`ingredient`}
                  type="text"
                  placeholder={"Enter Ingredient"}
                  onRemove={() => removeIngredientField(ingredient.id)}
                />
              ))}
              <div className="text-left">
                <span
                  className="text-sm bg-white text-black border border-black rounded hover:bg-black hover:text-white p-1 mt-7"
                  onClick={addIngredientField}
                >
                  Add Ingredient
                </span>
                <br></br>
              </div>
            </div>
            <div className="mt-3">
              {method.map((methodStep) => (
                <ListInput
                  key={methodStep.id}
                  id={`ingredient-${methodStep.id}`}
                  label={methodStep.id === 1 ? "Method" : ""}
                  name={`method`}
                  type="text"
                  placeholder={"Enter Method Step"}
                  onRemove={() => {
                    removeMethodField(methodStep.id);
                  }}
                />
              ))}
              <div className="text-left">
                <span
                  className="text-sm bg-white text-black border border-black rounded hover:bg-black hover:text-white p-1 mt-7"
                  onClick={addMethodField}
                >
                  Add Method Step
                </span>
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
        {state?.status === "success" && redirect("/")}
      </div>
    </div>
  );
}

/** TODO: - Link added ingredients fields to actions.js, so that new ingredient entries are added to the DB as a JSON object */
