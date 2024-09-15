import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import fetchRecentRecipes from "../../../app/lib/data.js";

export default async function RecentRecipes({ allLikes, currentUserId }) {
  let renderedRecipeCards = undefined;

  const allRecipes = await fetchRecentRecipes();

  if (allRecipes) {
    renderedRecipeCards = allRecipes.map((recipe, index) => {
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
        />
      );
    });
  }
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
