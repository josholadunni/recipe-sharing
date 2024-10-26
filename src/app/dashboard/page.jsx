"use server";
import React from "react";
import H1 from "../components/H1.jsx";
import DeleteButton from "../components/DeleteButton.jsx";
import MyRecipes from "../components/Dashboard/MyRecipes.jsx";
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
      <div>
        <H1 text="Dashboard" />
        {currentUserId && (
          <>
            {" "}
            <DeleteButton currentUserId={currentUserId.result} />
            <MyRecipes
              allLikes={allLikes}
              myRecipes={myRecipes}
              currentUserId={currentUserId.result}
            />
          </>
        )}
        {!currentUserId && <p>Not logged in</p>}
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}
