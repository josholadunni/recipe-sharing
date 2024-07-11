import React from "react";
import "../styles/Home.css";
import PopularRecipes from "./components/Home/PopularRecipes.jsx";
import RecentRecipes from "./components/Home/RecentRecipes.jsx";
import H1 from "./components/H1.jsx";
import H2 from "./components/H2.jsx";

export default async function Home() {
  return (
    <div>
      <H1 text="Recipe Sharer" />
      <H2 text="Recent Recipes" />
      <div>
        <RecentRecipes />
      </div>
      <H2 text="Popular Recipes" />
      {/* <PopularRecipes /> */}
    </div>
  );
}
