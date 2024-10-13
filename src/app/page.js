import React from "react";
import "../styles/Home.css";
import PopularRecipes from "./components/Home/PopularRecipes.jsx";
import RecentRecipes from "./components/Home/RecentRecipes.jsx";
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
      <div>
        <H1 text="Recipe Sharer" />
        <H2 text="Recent Recipes" />
        <div>
          <RecentRecipes
            allLikes={allLikes}
            currentUserId={currentUserId}
            recipes={recentRecipes}
          />
        </div>
        <H2 text="Popular Recipes" />
        <PopularRecipes
          allLikes={allLikes}
          currentUserId={currentUserId}
          recipes={popularRecipes}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading home page:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}
