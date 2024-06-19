import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import fetchRecentRecipes from "@/app/lib/data";
import { fetchRecipeLikes } from "@/app/lib/data";

export default async function RecentRecipes() {
  const allRecipes = await fetchRecentRecipes();
  const allLikes = await fetchRecipeLikes();
  const likeRecipeId = allLikes.map((like) => like.dataValues.RecipeId);
  const renderedRecipeCards = allRecipes.map((recipe) => {
    const categories = recipe.RecipeCategories.map((category) => category.name);
    console.log(likeRecipeId);
    return (
      <RecipeCard
        key={recipe.id}
        id={recipe.id}
        title={recipe.name}
        imgFileName={recipe.imageURL}
        description={recipe.short_description}
        likes={likeRecipeId.filter((like) => like === recipe.id).length}
        categories={categories}
      />
    );
  });
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
