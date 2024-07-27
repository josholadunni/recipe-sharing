"use client";

import React from "react";
import Input from "../components/Input.jsx";
import { createRecipe } from "../lib/actions.js";
import { useFormState } from "react-dom";
import { SubmitButton } from "./SubmitButton.jsx";

const initialState = { message: null };

export default function Form(props) {
  const categoryNames = props.categoryNames;
  const [state, formAction] = useFormState(createRecipe, initialState);

  return (
    <div>
      <div>
        <form action={formAction}>
          <div>
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
            <SubmitButton />
          </div>
        </form>
        {state?.status && <div>{state?.message}</div>}
        {state?.errorMessage && <p>{state?.errorMessage}</p>}
      </div>
    </div>
  );
}
