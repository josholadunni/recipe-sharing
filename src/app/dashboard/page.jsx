"use server";
import React from "react";
import H1 from "../components/H1.jsx";
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
        <MyRecipes
          allLikes={allLikes}
          myRecipes={myRecipes}
          currentUserId={currentUserId}
        />
      </div>
    );
  } catch (error) {
    console.error("Error loading dashboard:", error);
    return <div>Error loading page. Please try again later.</div>;
  }
}
