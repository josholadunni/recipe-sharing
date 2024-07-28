import React from "react";
import H1 from "../components/H1.jsx";
import MyRecipes from "../components/Dashboard/MyRecipes.jsx";

export default function Dashboard() {
  return (
    <div>
      <H1 text="Dashboard" />
      <MyRecipes />
    </div>
  );
}
