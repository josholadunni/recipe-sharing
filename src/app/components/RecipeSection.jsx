import React from "react";
import ContentWithSkeleton from "./Wrappers/ContentWithSkeleton";
import RecipeGrid from "./Home/RecipeGrid";
import RecipeCarousel from "./Home/RecipeCarousel";

async function RecipeSection({
  currentUserId,
  fetchRecipeLikes,
  fetchRecipes,
  layout,
}) {
  const [allLikes, recipes] = await Promise.all([
    fetchRecipeLikes(),
    fetchRecipes(),
  ]);
  return (
    <div>
      <ContentWithSkeleton data={(allLikes, recipes)}>
        {layout === "grid" ? (
          <RecipeGrid
            allLikes={allLikes}
            recipes={recipes}
            currentUserId={currentUserId}
            deleteButton={true}
          />
        ) : (
          <div className="flex">
            <RecipeCarousel
              allLikes={allLikes}
              recipes={recipes}
              currentUserId={currentUserId}
            />
          </div>
        )}
      </ContentWithSkeleton>
    </div>
  );
}

export default RecipeSection;
