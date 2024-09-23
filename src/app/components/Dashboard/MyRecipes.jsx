"use client";
import React from "react";
import RecipeCardWithDelete from "../RecipeCardWithDelete.jsx";

export default async function MyRecipes({
  allLikes,
  myRecipes,
  currentUserId,
}) {
  let renderedRecipeCards = undefined;

  if (myRecipes) {
    renderedRecipeCards = myRecipes.map((recipe, index) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);

      return (
        <RecipeCardWithDelete
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
        />
      );
    });
  }
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
