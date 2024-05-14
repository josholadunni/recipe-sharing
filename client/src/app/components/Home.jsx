import React from "react";
import RecipeCard from "./RecipeCard.jsx";
import "../styles/Home.css";

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

const popularRecipes = [
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

export default function Home() {
  return (
    <div>
      <h1>Recipe Sharer</h1>
      <h2>Featured Recipes</h2>
      <div className="recipe-grid">
        {featuredRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              imgFileName={recipe.imgFileName}
              description={recipe.description}
              categories={recipe.categories}
            />
          );
        })}
      </div>
      <h2>Popular Recipes</h2>
      <div className="recipe-grid">
        {popularRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              imgFileName={recipe.imgFileName}
              description={recipe.description}
              categories={recipe.categories}
            />
          );
        })}
      </div>
    </div>
  );
}
