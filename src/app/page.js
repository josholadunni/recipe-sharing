import React from "react";
import "../styles/Home.css";
import RecipeCarousel from "./components/Home/RecipeCarousel.jsx";
import fetchRecentRecipes from "./lib/data.js";
import {
  fetchRecipeLikes,
  findUserIdFromEmail,
  fetchPopularRecipes,
} from "./lib/data.js";
import H1 from "./components/H1.jsx";
import H2 from "./components/H2.jsx";

export default async function Home() {
  try {
    const [allLikes, recentRecipes, popularRecipes, currentUserId] =
      await Promise.all([
        fetchRecipeLikes(),
        fetchRecentRecipes(),
        fetchPopularRecipes(),
        findUserIdFromEmail(),
      ]);

    return (
      <div className="relative top-12">
        <H1 text="Recipe Sharer" color="text-orange-600" />
        <div className="mt-10">
          <H2 text="Recent Recipes" />
          <div className="flex justify-center">
            <RecipeCarousel
              allLikes={allLikes}
              currentUserId={currentUserId}
              recipes={recentRecipes}
              deleteButton={false}
            />
          </div>
          <div className="relative top-12 mt-10">
            <H2 text="Popular Recipes" />
            <div className="flex justify-center">
              <RecipeCarousel
                allLikes={allLikes}
                currentUserId={currentUserId}
                recipes={popularRecipes}
                deleteButton={false}
              />
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}
