import React from "react";
import "../styles/Home.css";
import PopularRecipes from "./components/Home/PopularRecipes.jsx";
import RecentRecipes from "./components/Home/RecentRecipes.jsx";

export default async function Home() {
  return (
    <div>
      <h1 className="text-center text-3xl font-medium pb-3 mt-5">
        Recipe Sharer
      </h1>
      <h2 className="text-center text-lg my-4">Recent Recipes</h2>
      <div>
        <RecentRecipes />
      </div>
      <h2>Popular Recipes</h2>
      {/* <PopularRecipes /> */}
    </div>
  );
}
