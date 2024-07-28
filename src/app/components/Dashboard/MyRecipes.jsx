import React from "react";
import RecipeCardWithDelete from "../RecipeCardWithDelete.jsx";
import { fetchMyRecipes } from "../../lib/data.js";
import { fetchRecipeLikes } from "../../lib/data.js";

export default async function MyRecipes() {
  let renderedRecipeCards = undefined;
  let likeRecipeId = undefined;
  const myRecipes = await fetchMyRecipes();
  const allLikes = await fetchRecipeLikes();
  if (allLikes) {
    likeRecipeId = allLikes.map((like) => like.dataValues.RecipeId);
  }
  if (myRecipes) {
    renderedRecipeCards = myRecipes.map((recipe) => {
      const categories = recipe.RecipeCategories.map(
        (category) => category.name
      );
      console.log(likeRecipeId);
      return (
        <RecipeCardWithDelete
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
