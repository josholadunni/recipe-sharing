"use client";

import React, { useState, useEffect } from "react";
import Input from "../components/Input.jsx";
import InputWithCharLimit from "./InputWithCharLimit.jsx";
import ListInput from "../components/ListInput.jsx";
import { createRecipe } from "../lib/actions.js";
import { useFormState } from "react-dom";
import { redirect } from "next/navigation.js";
import { useFormStatus } from "react-dom";
import $ from "jquery";

export default function Form(props) {
  const initialState = { message: null };

  const [state, formAction] = useFormState(createRecipe, initialState);
  const categoryNames = props.categoryNames;

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

  const { pending } = useFormStatus();
  const [errorMessage, setErrorMessage] = useState(null);

  let [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  const disableButton = () => {
    setIsSubmitDisabled(true);
    $("#submitBtn").prop("disabled", true);
    setErrorMessage("");
  };

  const enableButton = () => {
    setIsSubmitDisabled(false);
    $("#submitBtn").prop("disabled", false);
    setErrorMessage("");
  };

  //Adding new ingredient and method fields using the enter key
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

  //Validation & error messages
  useEffect(() => {
    if (checkedCategories.length > 5) {
      disableButton();
    } else {
      enableButton();
    }
  }, [addCategoryClick]);

  //Check word counts
  const [wordCounts, setWordCounts] = useState([0, 0, 0]); //An initial zero for each field

  const [overWordCounts, setOverWordCounts] = useState([false, false, false]);

  const handleWordCountChange = (index, count, isOverWordCount) => {
    const newWordCounts = [...wordCounts];
    newWordCounts[index] = count; // Assign the specific index
    setWordCounts(newWordCounts); // Update newWordCounts array
    if (isOverWordCount) {
      const newOverWordCounts = [...overWordCounts];
      newOverWordCounts[index] = isOverWordCount;
      setOverWordCounts(newOverWordCounts);
    } else {
      const newOverWordCounts = [...overWordCounts];
      newOverWordCounts[index] = isOverWordCount;
      setOverWordCounts(newOverWordCounts);
    }
  };

  useEffect(() => {
    if (overWordCounts.includes(true)) {
      disableButton();
    } else {
      enableButton();
    }
  }, [handleWordCountChange]);

  // const handleSubmit = () => {
  //   if (overWordCounts.includes(true)) {
  //     setErrorMessage("Some fields are over their character limit");
  //   }
  // };

  return (
    <div>
      <div>
        <form autoComplete="off" className="text-center" action={formAction}>
          <div className="inline-block text-left ">
            <InputWithCharLimit
              label="Recipe Name"
              name="rname"
              type="text"
              placeholder="Recipe Name"
              wordCount={wordCounts[0]}
              onWordCountChange={handleWordCountChange}
              index={0}
              charLimit={100}
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
            {checkedCategories?.length > 5 && (
              <p class="text-red-600">
                Too many categories. Please choose 5 or less.
              </p>
            )}
            <Input label="Image" name="file" type="file" accept="images/*" />
            <InputWithCharLimit
              label="Recipe Description"
              name="rdescription"
              type="text"
              placeholder="Recipe Description"
              wordCount={wordCounts[1]}
              onWordCountChange={handleWordCountChange}
              index={1}
              charLimit={200}
            />

            <InputWithCharLimit
              label="Short Recipe Description"
              name="srdescription"
              type="text"
              placeholder="Recipe short Description"
              wordCount={wordCounts[2]}
              onWordCountChange={handleWordCountChange}
              index={2}
              charLimit={50}
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
              <div>
                <button
                  id="submitBtn"
                  className={`bg-white text-black border border-black rounded hover:bg-black hover:text-white p-1 mt-12 ${
                    isSubmitDisabled &&
                    "bg-gray-200 text-gray-500 border-gray-500 hover:bg-gray-500"
                  }`}
                  type="submit"
                  aria-disabled={pending}
                >
                  {pending ? "Uploading..." : "Upload Recipe"}
                </button>
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </form>

        {state?.status && <div>{state?.message}</div>}
        {state?.errorMessage && (
          <p class="text-red-600">{state?.errorMessage}</p>
        )}
        {state?.status === "success" && redirect("/")}
      </div>
    </div>
  );
}

/** TODO: - Link added ingredients fields to actions.js, so that new ingredient entries are added to the DB as a JSON object */
