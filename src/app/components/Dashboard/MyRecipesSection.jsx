import React from "react";
import ContentWithSkeleton from "../Wrappers/ContentWithSkeleton";
import { fetchRecipeLikes, fetchMyRecipes } from "../../lib/data";
import RecipeGrid from "../Home/RecipeGrid";

async function MyRecipesSection({ currentUserId }) {
  const [allLikes, myRecipes] = await Promise.all([
    fetchRecipeLikes(),
    fetchMyRecipes(),
  ]);
  return (
    <div>
      {currentUserId ? (
        <ContentWithSkeleton data={(allLikes, myRecipes)}>
          <RecipeGrid
            allLikes={allLikes}
            recipes={myRecipes}
            currentUserId={currentUserId}
            deleteButton={true}
          />
        </ContentWithSkeleton>
      ) : (
        <p>You're not logged in</p>
      )}
    </div>
  );
}

export default MyRecipesSection;
