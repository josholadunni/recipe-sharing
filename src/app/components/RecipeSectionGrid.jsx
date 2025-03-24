import React from "react";
import ContentWithSkeleton from "./Wrappers/ContentWithSkeleton";
import RecipeGrid from "./Home/RecipeGrid";

async function RecipeSectionGrid({
  currentUserId,
  fetchRecipeLikes,
  fetchRecipes,
}) {
  const [allLikes, myRecipes] = await Promise.all([
    fetchRecipeLikes(),
    fetchRecipes(),
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

export default RecipeSectionGrid;
