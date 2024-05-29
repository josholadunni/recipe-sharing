import React from "react";
import Recipe from "../../lib/models/Recipe.js";

export default async function PopularRecipes() {
  const popularRecipes = await Recipe.findAll();
  console.log(popularRecipes);
  return (
    <div className="recipe-grid">
      return {popularRecipes};
      {/* //   <RecipeCard
        //     key={recipe.id}
        //     title={recipe.title}
        //     imgFileName={recipe.imgFileName}
        //     description={recipe.description}
        //     categories={recipe.categories}
        //   /> */}
    </div>
  );
}
