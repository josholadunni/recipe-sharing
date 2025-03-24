import React from "react";
import ContentWithSkeleton from "../Wrappers/ContentWithSkeleton";
import { fetchRecipeLikes, fetchLikedRecipes } from "../../lib/data";
import RecipeGrid from "../Home/RecipeGrid";

async function LikedRecipesSection({ currentUserId }) {
  const [allLikes, likedRecipes] = await Promise.all([
    fetchRecipeLikes(),
    fetchLikedRecipes(),
  ]);
  return (
    <div>
      {currentUserId ? (
        <ContentWithSkeleton data={(allLikes, likedRecipes)}>
          <RecipeGrid
            allLikes={allLikes}
            recipes={likedRecipes}
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

export default LikedRecipesSection;
