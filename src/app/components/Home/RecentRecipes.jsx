import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import Recipe from "../../lib/models/Recipe.js";
import RecipeCategory from "../../lib/models/RecipeCategory.js";
import RecipeRecipeCategory from "../../lib/models/RecipeRecipeCategory.js";

Recipe.belongsToMany(RecipeCategory, { through: RecipeRecipeCategory });
RecipeCategory.belongsToMany(Recipe, { through: RecipeRecipeCategory });

const featuredRecipes = [
  {
    id: 1,
    title: "Tasty Tacos",
    imgFileName: "IMG_0794.jpeg",
    description: "Spicy tacos from Mexico",
    categories: ["Mexican", "Meat", "Spicy"],
  },
  {
    id: 2,
    title: "Homemade Pizza",
    imgFileName: "IMG_0795.jpeg",
    description: "Cheap and customisable",
    categories: ["Italian"],
  },
  {
    id: 3,
    title: "Simple Salad",
    imgFileName: "IMG_0796.jpeg",
    description: "Rustle this up in 5 minutes and enjoy",
    categories: ["Italian"],
  },
  {
    id: 4,
    title: "Chocolate Brownies",
    imgFileName: "IMG_0797.webp",
    description: "Best warm and served with vanilla ice cream",
    categories: ["Dessert", "Chocolate"],
  },
];

const allRecipes = await Recipe.findAll({
  include: RecipeCategory,
});

// console.log(featuredRecipes);
// console.log(allRecipes[0].RecipeCategories[0].name);
// console.log(allRecipes[0].dataValues);

// let categoryNames = [];

// allRecipes.map((recipe) => {
//   recipe.RecipeCategories.map((category) => {
//     categoryNames.push(category.name);
//   });
// });

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
