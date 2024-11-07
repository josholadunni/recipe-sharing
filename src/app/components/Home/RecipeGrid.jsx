"use server";
import React from "react";
import RecipeCard from "../RecipeCard.jsx";

export default async function RecipeGrid({
  allLikes,
  recipes,
  currentUserId,
  deleteButton,
}) {
  let renderedRecipeCards = undefined;

  if (recipes) {
    renderedRecipeCards = recipes.map((recipe, index) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);

      if (deleteButton) {
        console.log("Deletable");
        return (
          <RecipeCard
            key={index}
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
    });
  }
  return (
    <div className="grid grid-cols-1 gap-y-8 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 recipe-grid justify-items-center">
      {renderedRecipeCards}
    </div>
  );
}
