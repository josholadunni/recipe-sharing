"use server";
import React from "react";
import H1 from "../components/H1.jsx";
import H2 from "../components/H2.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import RecipeGrid from "../components/Home/RecipeGrid.jsx";
import {
  fetchRecipeLikes,
  fetchMyRecipes,
  findUserIdFromEmail,
} from "../lib/data.js";

export default async function Dashboard() {
  try {
    const [allLikes, myRecipes, currentUserId] = await Promise.all([
      fetchRecipeLikes(),
      fetchMyRecipes(),
      findUserIdFromEmail(),
    ]);

    return (
      <div className="relative top-12 min-h-screen">
        <H1 text="Dashboard" />
        <div className="mt-10">
          <H2 text="My Recipes" />
          <div className="flex justify-center">
            {currentUserId && (
              <>
                {myRecipes ? (
                  <RecipeGrid
                    allLikes={allLikes}
                    recipes={myRecipes}
                    currentUserId={currentUserId.result}
                    deleteButton={true}
                  />
                ) : (
                  <p>No recipes found.</p>
                )}
              </>
            )}
            {!currentUserId && <p>Not logged in</p>}
          </div>
          {currentUserId && (
            <div className="flex justify-center mt-72">
              <DeleteButton currentUserId={currentUserId.result} />
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
