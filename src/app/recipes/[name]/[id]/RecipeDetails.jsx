"use client";
import { useState, useEffect } from "react";
import { getRecipeById } from "../../../lib/actions";
import H2 from "../../../components/H2";
import { Skeleton } from "@nextui-org/skeleton";

export default function RecipeDetails({ id, section }) {
  const [recipe, setRecipe] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);

        // Add a small delay to make the transition smoother
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      } catch (error) {
        console.error("Error loading recipe:", error);
      }
    }

    loadRecipe();
  }, [id]);

  if (section === "ingredients") {
    return (
      <div className="md:w-[250px] lg:w-[350px] border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-b-[#E4E4E7] pb-4">
        <Skeleton isLoaded={isLoaded} className="h-8 w-32 mb-4 rounded-lg">
          <H2 text={"Ingredients"} />
        </Skeleton>

        <div className="rounded-2xl md:mr-4">
          <Skeleton isLoaded={isLoaded} className="w-full">
            {isLoaded && recipe && (
              <ul className="list-disc list-inside">
                {recipe.ingredients
                  .filter(
                    (ingredient) =>
                      ingredient !== "undefined" &&
                      !ingredient.includes("ingredient-")
                  )
                  .map((ingredient, index) => (
                    <li className="mb-3" key={index}>
                      {ingredient}
                    </li>
                  ))}
              </ul>
            )}
          </Skeleton>
        </div>
      </div>
    );
  }

  if (section === "method") {
    return (
      <div className="flex flex-col md:ml-14">
        <Skeleton isLoaded={isLoaded} className="h-8 w-24 mb-4 rounded-lg">
          <H2 text={"Method"} />
        </Skeleton>

        <div className="rounded-2xl mr-4">
          <Skeleton isLoaded={isLoaded} className="w-full">
            {isLoaded && recipe && (
              <ul className="list-decimal list-inside">
                {recipe.method
                  .filter(
                    (method) => method !== "" && !method.includes("method-")
                  )
                  .map((methodStep, index) => (
                    <li className="mb-3" key={index}>
                      {methodStep}
                    </li>
                  ))}
              </ul>
            )}
          </Skeleton>
        </div>
      </div>
    );
  }

  return null;
}
