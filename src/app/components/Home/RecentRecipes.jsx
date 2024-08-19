import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import fetchRecentRecipes from "../../../app/lib/data.js";
import { fetchRecipeLikes } from "../../../app/lib/data.js";

export default async function RecentRecipes() {
  let renderedRecipeCards = undefined;
  let likeRecipeId = undefined;
  const allRecipes = await fetchRecentRecipes();
  const allLikes = await fetchRecipeLikes();
  if (allLikes) {
    likeRecipeId = allLikes.map((like) => like.dataValues.RecipeId);
  }
  if (allRecipes) {
    renderedRecipeCards = allRecipes.map((recipe) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);
      return (
        <RecipeCard
          key={recipe.id}
          id={recipe.id}
          title={recipe.name}
          imgFileName={recipe.imageURL}
          description={recipe.short_description}
          likes={likeRecipeId.filter((like) => like === recipe.id).length}
          categories={categories}
          username={recipe.username}
        />
      );
    });
  }
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
