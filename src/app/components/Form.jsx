"use client";

import React, { useState, useEffect } from "react";
import Input from "../components/Input.jsx";
import InputWithCharLimit from "./InputWithCharLimit.jsx";
import ListInput from "../components/ListInput.jsx";
import { createRecipe } from "../lib/actions.js";
import { useActionState } from "react";
import { redirect } from "next/navigation.js";
import { useFormStatus } from "react-dom";
import $ from "jquery";
import Image from "next/image";
import H2 from "./H2.jsx";
import H3 from "./H3.js";
import Link from "next/link.js";
import imageCompression from "browser-image-compression";
import ContentWithSkeleton from "../components/Wrappers/ContentWithSkeleton.jsx";
import { fetchCategories } from "../lib/actions.js";

function SubmitButton({ isDisabled }) {
  const { pending } = useFormStatus();

  return (
    <button
      id="submitBtn"
      className={`rounded-full border-1 border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white mt-6 px-4 py-1 text-sm tracking-widest font-bold ${
        isDisabled &&
        "bg-gray-200 text-gray-500 border-gray-500 hover:bg-gray-500"
      }`}
      type="submit"
      aria-disabled={pending || isDisabled}
      disabled={pending || isDisabled}
    >
      {pending ? "Uploading..." : "Upload Recipe"}
    </button>
  );
}

export default function Form() {
  const initialState = { message: null };

  const [categories, setCategories] = useState([]);

  //Once mounted, await the fetchCategories server function and set the categories state to the fetched data
  useEffect(() => {
    const getCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    getCategories();
    return () => {};
  }, []);

  const categoryNames = categories
    ? categories
        .map((category) => {
          const categoryName = category.name;
          const capitalized =
            categoryName.charAt(0).toUpperCase() +
            categoryName.slice(1).toLowerCase();
          return capitalized;
        })
        .sort()
    : [];

  const [ingredients, setIngredients] = useState([{ id: 1 }]);

  const [method, setMethodStep] = useState([{ id: 1 }]);

  const [checkedCategories, setCheckedCategory] = useState([]);

  const [formState, setFormState] = useState({
    rname: "",
    rdescription: "",
    srdescription: "",
    file: null,
    categories: checkedCategories,
    ingredients: [],
    method: [],
    overWordCount: [],
  });

  const [serverState, formAction] = useActionState(
    async (prevState, formData) => {
      const finalFormData = new FormData();
      Object.entries(formState).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item) => finalFormData.append(key, item));
        } else if (value !== null) {
          finalFormData.append(key, value);
        }
      });
      return createRecipe(prevState, finalFormData);
    },

    initialState
  );

  const [imagePreview, setImagePreview] = useState(null);

  const [imageError, setImageError] = useState(null);

  const [currentStep, setCurrentStep] = useState(0);

  const [errorMessage, setErrorMessage] = useState(null);

  let [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  // Create a function to validate fields based on current step
  const validateCurrentStep = () => {
    switch (currentStep) {
      case 0: // Step 1
        const step1Fields = [
          formState.rname,
          formState.rdescription,
          formState.srdescription,
          formState.file,
        ];
        return (
          !step1Fields.some((field) => !field) &&
          !imageError &&
          formState.overWordCount.length === 0
        );

      case 1: // Step 2
        // Check if categories are valid (e.g., not too many)
        return checkedCategories.length > 0 && checkedCategories.length <= 5;

      case 2: // Step 3
        // Check if ingredients are valid
        return formState.ingredients.length > 0;

      case 3: // Step 4
        // Check if method steps are valid
        return formState.method.length > 0;

      case 4: // Step 5 (review)
        // All previous steps should be valid
        return formState.overWordCount.length === 0;

      default:
        return false;
    }
  };

  // Update button state based on current step validation
  const updateButtonState = () => {
    const isValid = validateCurrentStep();

    if (isValid) {
      setIsSubmitDisabled(false);
      $("#submitBtn").prop("disabled", false);
      setErrorMessage("");
    } else {
      setIsSubmitDisabled(true);
      $("#submitBtn").prop("disabled", true);
      setErrorMessage("");
    }
  };

  // Single useEffect to handle validation on step change or form state change
  useEffect(() => {
    updateButtonState();
  }, [currentStep, formState, checkedCategories, imageError]);

  const handleImageChange = async (e) => {
    const image = e.target.files[0];
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };
    if (image) {
      try {
        //Compress Image
        let compressedImage = await imageCompression(image, options);

        //Create a new File object from the compressed image
        compressedImage = new File([compressedImage], image.name, {
          type: compressedImage.type,
        });

        //Remove any existing error messages and store the compressed file inside the formState
        setImageError(null);
        setFormState((prev) => ({
          ...prev,
          file: compressedImage,
        }));
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
      } catch (error) {
        console.error(error);
      }
    }
  };

  const addIngredientField = () => {
    // Find the highest existing ID
    const maxId = ingredients.reduce(
      (max, ingredient) => Math.max(max, ingredient.id),
      0
    );
    // Use the next number after the highest ID
    const newId = maxId + 1;
    setIngredients([...ingredients, { id: newId }]);
  };

  const removeIngredientField = (idNumber, id, name) => {
    if (idNumber !== 1) {
      setIngredients(
        ingredients.filter((ingredient) => ingredient.id !== idNumber)
      );

      setFormState((prev) => {
        const idIndex = prev[name].findIndex((item) => item === id);
        if (idIndex !== -1) {
          const newArray = [...prev[name]];
          newArray.splice(idIndex, 2);
          return {
            ...prev,
            [name]: newArray,
          };
        }
        return prev;
      });
    }
  };

  const addMethodField = () => {
    // Find the highest existing ID
    const maxId = method.reduce(
      (max, methodStep) => Math.max(max, methodStep.id),
      0
    );
    // Use the next number after the highest ID
    const newId = maxId + 1;
    setMethodStep([...method, { id: newId }]);
  };

  const removeMethodField = (idNumber, id, name) => {
    if (idNumber !== 1) {
      setMethodStep(method.filter((step) => step.id !== idNumber));

      setFormState((prev) => {
        const idIndex = prev[name].findIndex((item) => item === id);
        if (idIndex !== -1) {
          const newArray = [...prev[name]];
          newArray.splice(idIndex, 2);
          return {
            ...prev,
            [name]: newArray,
          };
        }
        return prev;
      });
    }
  };

  const addCategoryClick = (e) => {
    if (checkedCategories.includes(e.target.value)) {
      const updatedCategories = checkedCategories.filter(
        (category) => category !== e.target.value
      );

      setCheckedCategory(updatedCategories);

      setFormState((prev) => ({
        ...prev,
        categories: updatedCategories,
      }));
    } else {
      const updatedCategories = [...checkedCategories, e.target.value];

      setCheckedCategory(updatedCategories);

      setFormState((prev) => ({
        ...prev,
        categories: updatedCategories,
      }));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handleWordCountChange = (id, name, index, count, isOverWordCount) => {
    if (isOverWordCount) {
      setFormState((prev) => ({
        ...prev,
        overWordCount: prev.overWordCount.includes(id)
          ? prev.overWordCount
          : [...prev.overWordCount, id],
      }));
    } else {
      const updatedWordCountArr = formState.overWordCount.filter(
        (e) => e !== id
      );
      setFormState((prev) => {
        return { ...prev, overWordCount: updatedWordCountArr };
      });
    }
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
        if (e.target.name === "ingredients") {
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
  }, [ingredients, method]);

  const renderCategories = () => {
    return formState.categories.map((category, index) => {
      const categoryName = category;

      return (
        <div
          key={index}
          className="bg-neutral-200 border-neutral-200 rounded-full border-[1px] py-1 px-4 mr-2 my-1 text-sm text-black text-nowrap"
          href={`/categories/${categoryName.toLowerCase()}`}
        >
          {categoryName}
        </div>
      );
    });
  };

  const renderIngredients = () => {
    const ingredients = formState.ingredients;
    const filteredIngredients = ingredients.filter(
      (ingredient) =>
        ingredient !== "undefined" && !ingredient.includes("ingredient-")
    );
    return (
      <>
        <div>
          <H3 text={"Ingredients"} />
        </div>
        <div className="bg-white rounded-2xl md:mr-4">
          <ul className="list-disc list-inside">
            {filteredIngredients.map((ingredient, index) => (
              <li className="mb-3" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderMethod = () => {
    const method = formState.method;
    const filteredMethod = method.filter(
      (method) => method !== "" && !method.includes("method-")
    );
    return (
      <>
        <H3 text={"Method"} />
        <div className="bg-white rounded-2xl mr-4">
          <ul className="list-decimal list-inside">
            {filteredMethod.map((methodStep, index) => (
              <li className="mb-3" key={index}>
                {methodStep}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  return (
    <ContentWithSkeleton data={categories}>
      <div>
        <H2 text={`Step ${currentStep + 1} of 5`} className="text-center" />
        <div>
          <p className="text-center">
            Give your recipe a name and take a snap of it
          </p>
          <form autoComplete="off" className="text-center" action={formAction}>
            <div className="inline-block text-left">
              {currentStep === 0 && (
                // Step 1
                <div
                  key="step1"
                  className="flex flex-col h-full justify-between"
                >
                  <div className="flex flex-col">
                    <InputWithCharLimit
                      id={"recipe-name"}
                      label="Recipe Name"
                      name="rname"
                      type="text"
                      placeholder="Recipe Name"
                      formState={formState}
                      setFormState={setFormState}
                      onWordCountChange={handleWordCountChange}
                      index={0}
                      charLimit={25}
                    />
                    <InputWithCharLimit
                      id={"recipe-description"}
                      label="Recipe Description"
                      name="rdescription"
                      type="text"
                      placeholder="Recipe Description"
                      formState={formState}
                      setFormState={setFormState}
                      onWordCountChange={handleWordCountChange}
                      index={1}
                      charLimit={50}
                    />
                    <InputWithCharLimit
                      id="short-description"
                      label="Short Recipe Description"
                      name="srdescription"
                      type="text"
                      placeholder="Recipe short Description"
                      formState={formState}
                      setFormState={setFormState}
                      onWordCountChange={handleWordCountChange}
                      index={2}
                      charLimit={25}
                    />
                    <Input
                      label="Image"
                      name="file"
                      type="file"
                      accept="images/*"
                      onChange={handleImageChange}
                    />
                    {imageError && <p className="text-red-600">{imageError}</p>}
                    {imagePreview && (
                      <div className="pb-20">
                        <Image
                          src={imagePreview}
                          alt="Image Preview"
                          width={350}
                          height={350}
                        />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-row align-bottom mt-auto">
                    <button
                      className={`rounded-full border-1 mt-6 ${
                        isSubmitDisabled
                          ? "border-gray-400 text-gray-400 disabled:cursor-not-allowed"
                          : "border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white"
                      } px-4 py-1 text-sm tracking-widest font-bold`}
                      onClick={handleNextStep}
                      disabled={isSubmitDisabled}
                      aria-disabled={isSubmitDisabled}
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {currentStep === 1 && (
                //Step 2
                <div key="step2" className={`flex-col h-full justify-between`}>
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
                            defaultChecked={checkedCategories.includes(
                              category
                            )}
                          ></input>
                        </div>
                      );
                    })}
                  </div>
                  {checkedCategories?.length > 5 && (
                    <p className="text-red-600">
                      Too many categories. Please choose 5 or less.
                    </p>
                  )}
                  <div className="flex flex-row align-bottom mt-auto">
                    <button
                      className="rounded-full border-1 border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white mt-6 px-4 py-1 text-sm tracking-widest font-bold"
                      onClick={handlePrevStep}
                      type="button"
                    >
                      Previous
                    </button>
                    <button
                      className={`rounded-full border-1 mt-6 ${
                        isSubmitDisabled
                          ? "border-gray-400 text-gray-400 disabled:cursor-not-allowed"
                          : "border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white"
                      } px-4 py-1 text-sm tracking-widest font-bold`}
                      onClick={handleNextStep}
                      disabled={isSubmitDisabled}
                      aria-disabled={isSubmitDisabled}
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                //Step 3
                <div key="step3">
                  {ingredients.map((ingredient) => (
                    <ListInput
                      key={`ingredient-${ingredient.id}`}
                      id={`ingredient-${ingredient.id}`}
                      idNumber={ingredient.id}
                      label={ingredient.id === 1 ? "Ingredients" : ""}
                      name={`ingredients`}
                      type="text"
                      placeholder={"Enter Ingredient"}
                      onRemove={removeIngredientField}
                      formState={formState}
                      setFormState={setFormState}
                      onWordCountChange={handleWordCountChange}
                      charLimit={25}
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
                  <div className="flex flex-row absolute mt-auto">
                    <button
                      className="rounded-full border-1 border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white mt-6 px-4 py-1 text-sm tracking-widest font-bold"
                      onClick={handlePrevStep}
                      type="button"
                    >
                      Previous
                    </button>
                    <button
                      className={`rounded-full border-1 mt-6 ${
                        isSubmitDisabled
                          ? "border-gray-400 text-gray-400 disabled:cursor-not-allowed"
                          : "border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white"
                      } px-4 py-1 text-sm tracking-widest font-bold`}
                      onClick={handleNextStep}
                      disabled={isSubmitDisabled}
                      aria-disabled={isSubmitDisabled}
                      type="button"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                //Step 4
                <div>
                  {method.map((methodStep) => (
                    <ListInput
                      key={`method-${methodStep.id}`}
                      id={`method-${methodStep.id}`}
                      idNumber={methodStep.id}
                      label={methodStep.id === 1 ? "Method" : ""}
                      name={`method`}
                      type="text"
                      placeholder={"Enter Method Step"}
                      onRemove={removeMethodField}
                      formState={formState}
                      setFormState={setFormState}
                      onWordCountChange={handleWordCountChange}
                      charLimit={50}
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
                  <div className="text-center">
                    <div className="flex flex-row absolute mt-auto">
                      <button
                        className="rounded-full border-1 border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white mt-6 px-4 py-1 text-sm tracking-widest font-bold"
                        onClick={handlePrevStep}
                        type="button"
                      >
                        Previous
                      </button>
                      <button
                        className={`rounded-full border-1 mt-6 ${
                          isSubmitDisabled
                            ? "border-gray-400 text-gray-400 disabled:cursor-not-allowed"
                            : "border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white"
                        } px-4 py-1 text-sm tracking-widest font-bold`}
                        onClick={handleNextStep}
                        disabled={isSubmitDisabled}
                        aria-disabled={isSubmitDisabled}
                        type="button"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {currentStep === 4 && (
                <>
                  {/* Step 5 - Preview */}
                  <div className="hidden md:flex flex-col mt-10">
                    <div className="flex flex-row border-b-[1.5px] border-b-[#E4E4E7] pb-10">
                      <div className="basis-1/3">
                        {imagePreview && (
                          <Image
                            src={imagePreview}
                            alt="Image Preview"
                            width={500}
                            height={500}
                          />
                        )}
                      </div>
                      <div className="basis-2/3 ml-10">
                        <div className="flex flex-col">
                          <H2 text={formState.rname}></H2>
                          <div className="flex flex-row">
                            {renderCategories()}
                          </div>
                          <p>{formState.rdescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row mt-10 ">
                      <div className="basis-1/3">{renderIngredients()}</div>
                      <div className="basis-2/3 border-l-[1.5px] border-[#E4E4E7] pl-12">
                        {renderMethod()}
                      </div>
                    </div>
                    <div className="flex flex-row items-center justify-between mt-6">
                      <button
                        className="rounded-full border-1 border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white mt-6 px-4 py-1 text-sm tracking-widest font-bold"
                        onClick={handlePrevStep}
                        type="button"
                      >
                        Previous
                      </button>
                      <SubmitButton isDisabled={isSubmitDisabled} />
                    </div>
                  </div>
                  {/* Mobile */}
                  <div className="md:hidden flex flex-col mt-10">
                    <div className="flex flex-col border-b-[1.5px] border-b-[#E4E4E7] pb-10">
                      <div className="basis-1/3">
                        {imagePreview && (
                          <Image
                            src={imagePreview}
                            alt="Image Preview"
                            width={500}
                            height={500}
                          />
                        )}
                      </div>
                      <div>
                        <div className="flex flex-col">
                          <H2 text={formState.rname}></H2>
                          <div className="flex flex-row">
                            {renderCategories()}
                          </div>
                          <p>{formState.rdescription}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mt-3">
                      <div>{renderIngredients()}</div>
                      <div className="pt-6 border-t-[1.5px] border-[#E4E4E7]">
                        {renderMethod()}
                      </div>
                      <div className="flex flex-row items-center justify-between mt-6">
                        <button
                          className="rounded-full border-1 border-recipe-red text-recipe-red hover:bg-recipe-red hover:text-white mt-6 px-4 py-1 text-sm tracking-widest font-bold"
                          onClick={handlePrevStep}
                          type="button"
                        >
                          Previous
                        </button>
                        <SubmitButton isDisabled={isSubmitDisabled} />
                      </div>
                    </div>
                  </div>
                  <p className="text-center mt-2">{errorMessage}</p>
                </>
              )}
            </div>
          </form>

          {serverState?.status && <div>{serverState?.message}</div>}
          {serverState?.errorMessage && (
            <p className="text-red-600">{serverState?.errorMessage}</p>
          )}
          {serverState?.status === "success" && redirect("/")}
        </div>
      </div>
    </ContentWithSkeleton>
  );
}

/** TODO: - Link added ingredients fields to actions.js, so that new ingredient entries are added to the DB as a JSON object */
