"use server";
import React from "react";
import H1 from "../components/H1.jsx";
import H2 from "../components/H2.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import {
  fetchRecipeLikes,
  fetchLikedRecipes,
  fetchMyRecipes,
  findUserIdFromEmail,
} from "../lib/data.js";
import RecipeSectionGrid from "../components/RecipeSectionGrid.jsx";

export default async function Dashboard() {
  try {
    const currentUserId = await findUserIdFromEmail();

    return (
      <div className="relative top-12 min-h-screen">
        <H1 text="Dashboard" />
        {/* My Recipes */}
        <div className="mt-10">
          <H2 text="My Recipes" />
          {currentUserId ? (
            <RecipeSectionGrid
              currentUserId={currentUserId}
              fetchRecipeLikes={fetchRecipeLikes}
              fetchRecipes={fetchMyRecipes}
            />
          ) : (
            <p>Not Logged In</p>
          )}
          {/* Liked Recipes */}
          <div className="mt-10">
            <H2 text="Liked Recipes" />
            <RecipeSectionGrid
              currentUserId={currentUserId}
              fetchRecipeLikes={fetchRecipeLikes}
              fetchRecipes={fetchLikedRecipes}
            />
          </div>
          {currentUserId && (
            <div className="flex justify-center mt-20">
              <DeleteButton currentUserId={currentUserId} />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}
