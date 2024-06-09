"use client";

import React, { useState } from "react";
import Input from "../components/Input.jsx";

export default function Form(props) {
  const [formData, setFormData] = useState({
    rname: "",
    iurl: "",
    rdescription: "",
    srdescription: "",
    rcselect: [],
  });

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    if (type === "checkbox") {
      setFormData((prevData) => {
        if (checked) {
          return { ...prevData, rcselect: [...prevData.rcselect, value] };
        } else {
          return {
            ...prevData,
            rcselect: prevData.rcselect.filter(
              (category) => category !== value
            ),
          };
        }
      });
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      console.log("Recipe posted successfulyl");
    } else {
      console.error("Failed to post recipe");
    }
  }

  const categoryNames = props.categoryNames;

  return (
    <div>
      <h1 className="text-center text-3xl font-medium pb-3 mt-5">Add Recipe</h1>
      <div>
        <form method="POST" onSubmit={handleSubmit}>
          <div>
            <Input
              label="Recipe Name"
              name="rname"
              type="text"
              placeholder="Recipe Name"
              onChange={handleChange}
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
                      onChange={handleChange}
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
              onChange={handleChange}
            />
            <Input
              label="Recipe Description"
              name="rdescription"
              type="text"
              x
              placeholder="Recipe Description"
              onChange={handleChange}
            />
            <Input
              label="Short Recipe Description"
              name="srdescription"
              type="text"
              placeholder="Recipe short Description"
              onChange={handleChange}
            />
            <Input type="submit" value="submit" />
          </div>
        </form>
      </div>
    </div>
  );
}
