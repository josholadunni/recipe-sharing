import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import Recipe from "../../lib/models/Recipe.js";
import RecipeCategory from "../../lib/models/RecipeCategory.js";
import RecipeRecipeCategory from "../../lib/models/RecipeRecipeCategory.js";

Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });

const allRecipes = await Recipe.findAll({
  include: RecipeCategory,
});

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

export default function RecentRecipes() {
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
