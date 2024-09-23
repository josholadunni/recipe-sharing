"use server";
import React from "react";
import RecipeCard from "../RecipeCard.jsx";

export default async function RecentRecipes({
  allLikes,
  recentRecipes,
  currentUserId,
}) {
  let renderedRecipeCards = undefined;

  if (recentRecipes) {
    renderedRecipeCards = recentRecipes.map((recipe, index) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);

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
        />
      );
    });
  }
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
