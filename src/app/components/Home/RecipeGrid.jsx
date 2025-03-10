"use client";
import React, { useEffect, useState } from "react";
import RecipeCard from "../RecipeCard.jsx";

export default function RecipeGrid({
  allLikes,
  recipes,
  currentUserId,
  deleteButton,
}) {
  const [visibleItemCount, setVisibleItemCount] = useState(4);
  const [displayedData, setDisplayedData] = useState(
    recipes.slice(0, visibleItemCount)
  );
  const [recipesLeft, setRecipesLeft] = useState(recipes.length - 4);
  const [maxItemsVisible, setMaxItemsVisible] = useState(false);

  const handleSeeMore = () => {
    setVisibleItemCount((prevCount) => prevCount + 4);
    setDisplayedData(recipes.slice(0, visibleItemCount + 4));
    setRecipesLeft(recipesLeft - 4);
  };

  //If recipesLeft isn't totally divisible by 4, set the max items visible state to true
  useEffect(() => {
    if (recipesLeft % 4 < 0) {
      setMaxItemsVisible(true);
    } else {
      setMaxItemsVisible(false);
    }
  }, [recipesLeft]);

  const handleHide = () => {
    setVisibleItemCount(4);
    setDisplayedData(recipes.slice(0, 4));
    setRecipesLeft(recipes.length - 4);
  };

  const totalRecipes = recipes.length;

  return (
    <div className="flex flex-col mb-20 pb-10">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 recipe-grid gap-x-8 gap-y-8 md:gap-8 justify-items-center">
        {displayedData.map((recipe, index) => {
          const categories = recipe.RecipeCategories.map((category) => [
            category.name,
            category.id,
          ]);

          // Calculate column start class for XL screens when there are 1 or 2 items
          let colStartClass = "";
          if (totalRecipes <= 2) {
            if (totalRecipes === 1) {
              colStartClass = "xl:col-start-3"; // Center single item
            } else if (totalRecipes === 2) {
              colStartClass = index === 0 ? "xl:col-start-2" : "xl:col-start-3"; // Position two items in middle
            }
          }

          if (deleteButton) {
            return (
              <RecipeCard
                key={index}
                className={colStartClass}
                id={recipe.id}
                title={recipe.name}
                imgFileName={recipe.imageURL}
                description={recipe.short_description}
                allLikes={allLikes}
                currentUserId={currentUserId}
                categories={categories}
                username={recipe.username}
                slug={recipe.name.replace(/\s+/g, "-").toLowerCase()}
                createdAt={recipe.createdAt}
                deletable={true}
              />
            );
          } else {
            return (
              <RecipeCard
                key={index}
                className={colStartClass}
                id={recipe.id}
                title={recipe.name}
                imgFileName={recipe.imageURL}
                description={recipe.short_description}
                allLikes={allLikes}
                currentUserId={currentUserId}
                categories={categories}
                username={recipe.username}
                slug={recipe.name.replace(/\s+/g, "-").toLowerCase()}
                createdAt={recipe.createdAt}
                deletable={false}
              />
            );
          }
        })}
      </div>
      <div className="flex flex-row justify-center">
        {!maxItemsVisible ? (
          <button
            className="rounded-full border-1 border-recipe-red hover:bg-recipe-red mt-6 text-recipe-red hover:text-white px-4 py-1 text-sm tracking-widest font-bold"
            onClick={handleSeeMore}
          >
            SEE MORE
          </button>
        ) : (
          <button
            className="rounded-full border-1 border-recipe-red hover:bg-recipe-red mt-6 text-recipe-red hover:text-white px-4 py-1 text-sm tracking-widest font-bold"
            onClick={handleHide}
          >
            HIDE
          </button>
        )}
      </div>
    </div>
  );
}
