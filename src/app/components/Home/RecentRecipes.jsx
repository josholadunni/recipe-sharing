import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import fetchRecentRecipes from "@/app/lib/data";

export default async function RecentRecipes() {
  const allRecipes = await fetchRecentRecipes();
  const renderedRecipeCards = allRecipes.map((recipe) => {
    const categories = recipe.RecipeCategories.map((category) => category.name);
    return (
      <RecipeCard
        key={recipe.id}
        title={recipe.name}
        imgFileName={recipe.imageURL}
        description={recipe.short_description}
        categories={categories}
      />
    );
  });
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
