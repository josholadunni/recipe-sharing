"use client";
import { useState, useEffect } from "react";
import { getRecipeById } from "../../../lib/actions";
import ImageWithSkeleton from "../../../components/ImageWithSkeleton";
import Link from "next/link";
import { Skeleton } from "@nextui-org/skeleton";

export default function RecipeHeader({ id, isMobile }) {
  const [recipe, setRecipe] = useState(null);
  const [username, setUsername] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //Load recipe and update state once loaded
    async function loadRecipe() {
      try {
        const recipeData = await getRecipeById(id);
        setRecipe(recipeData);
        setUsername(recipeData.username);

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

  const renderCategories = () => {
    if (!recipe || !recipe.RecipeCategories) return null;

    return recipe.RecipeCategories.map((category, index) => (
      <Link
        key={index}
        href={`/categories/${category.name.toLowerCase()}/${category.id}`}
        className="mr-2 my-1 px-3 py-1 bg-recipe-gray-50 rounded-full text-sm"
      >
        {category.name}
      </Link>
    ));
  };

  if (isMobile) {
    return (
      <Skeleton
        isLoaded={isLoaded}
        className="min-w-[20rem] w-full md:w-1/3 sm:hidden"
      >
        {isLoaded && recipe ? (
          <div className="flex flex-col justify-center mt-5 w-full relative">
            <div className="aspect-square w-full relative">
              <ImageWithSkeleton data={recipe} />
            </div>
            <h1
              style={{ fontWeight: 900 }}
              className="text-3xl font-medium mt-4"
            >
              {recipe.name}
            </h1>
            <div className="flex">
              <Link
                className="text-center text-recipe-red hover:text-red-700 underline text-under"
                href={`/users/${username}`}
              >
                {username}
              </Link>
            </div>
            <div className="mt-4">{recipe.short_description}</div>
            <div className="mt-7 flex flex-wrap">{renderCategories()}</div>
          </div>
        ) : (
          <div className="flex flex-col justify-center mt-5 w-full relative">
            <div className="aspect-square w-full bg-gray-200 rounded-lg"></div>
            <div className="h-8 w-3/4 mt-4 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-1/4 mt-2 bg-gray-200 rounded-lg"></div>
            <div className="h-4 w-full mt-7 bg-gray-200 rounded-lg"></div>
            <div className="mt-7 flex flex-wrap">
              <div className="h-6 w-20 mr-2 my-1 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-24 mr-2 my-1 bg-gray-200 rounded-full"></div>
              <div className="h-6 w-16 mr-2 my-1 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        )}
      </Skeleton>
    );
  }

  return (
    <div className="min-w-[25rem] hidden sm:block sm:w-full mt-10 border-b-[1.5px] border-b-[#E4E4E7] pb-10">
      <div className="flex flex-col md:flex-row justify-center md:justify-start w-full relative">
        <div className="flex basis-1/4 justify-center items-center">
          <Skeleton
            isLoaded={isLoaded}
            className="aspect-square sm:w-[500px] md:w-[350px] rounded-lg"
          >
            {isLoaded && recipe && (
              <div className="aspect-square w-full relative">
                <ImageWithSkeleton data={recipe} />
              </div>
            )}
          </Skeleton>
        </div>
        <div className="flex flex-col align-middle my-auto basis-3/4 md:ml-14 sm:pt-5 md:pt-0">
          <Skeleton isLoaded={isLoaded} className="h-10 w-3/4 rounded-lg">
            {recipe && (
              <h1 style={{ fontWeight: 900 }} className="text-3xl font-medium">
                {recipe.name}
              </h1>
            )}
          </Skeleton>

          <div className="py-4 flex flex-wrap">
            <Skeleton isLoaded={isLoaded} className="w-full">
              {isLoaded && renderCategories()}
            </Skeleton>
          </div>

          <Skeleton isLoaded={isLoaded} className="h-4 w-1/4 rounded-lg">
            {recipe && (
              <Link
                className="text-center text-recipe-red hover:text-red-700 underline text-under"
                href={`/users/${username}`}
              >
                {username}
              </Link>
            )}
          </Skeleton>

          <Skeleton isLoaded={isLoaded} className="h-4 w-full mt-4 rounded-lg">
            {recipe && <div>{recipe.short_description}</div>}
          </Skeleton>
        </div>
      </div>
    </div>
  );
}
