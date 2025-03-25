import React from "react";
import "../styles/Home.css";
import RecipeSection from "./components/RecipeSection";
import { fetchRecentRecipes } from "./lib/data.js";
import {
  fetchRecipeLikes,
  findUserIdFromEmail,
  fetchPopularRecipes,
} from "./lib/data.js";
import H2 from "./components/H2.jsx";

export default async function Home() {
  try {
    const currentUserId = await findUserIdFromEmail();
    return (
      <div className="relative top-12">
        <div className="mt-10 mx-2">
          <H2 text="Recent Recipes" />
          <RecipeSection
            currentUserId={currentUserId}
            fetchRecipeLikes={fetchRecipeLikes}
            fetchRecipes={fetchRecentRecipes}
            layout={"carousel"}
          />
          <div className="relative top-12 mt-10">
            <H2 text="Popular Recipes" />
            <div className="pb-32">
              <RecipeSection
                currentUserId={currentUserId}
                fetchRecipeLikes={fetchRecipeLikes}
                fetchRecipes={fetchPopularRecipes}
                layout={"carousel"}
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
