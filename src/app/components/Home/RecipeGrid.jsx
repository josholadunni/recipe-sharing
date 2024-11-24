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
    const totalRecipes = recipes.length;
    renderedRecipeCards = recipes.map((recipe, index) => {
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
    });
  }
  return (
    <div className="grid grid-cols-1 gap-y-8 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 recipe-grid justify-items-center">
      {renderedRecipeCards}
    </div>
  );
}
