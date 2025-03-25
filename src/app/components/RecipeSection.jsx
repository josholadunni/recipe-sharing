import React from "react";
import ContentWithSkeleton from "./Wrappers/ContentWithSkeleton";
import RecipeGrid from "./Home/RecipeGrid";
import RecipeCarousel from "./Home/RecipeCarousel";

async function RecipeSection({
  currentUserId,
  fetchRecipeLikes,
  fetchRecipes,
  categoryId,
  isDeletable,
  layout,
}) {
  const [allLikes, recipes] = await Promise.all([
    fetchRecipeLikes(),
    fetchRecipes(categoryId),
  ]);
  const serializedData = {
    recipes: JSON.parse(JSON.stringify(recipes)),
    allLikes: JSON.parse(JSON.stringify(allLikes)),
    // currentUserId: currentUserId?.result || null,
  };
  return (
    <div>
      <ContentWithSkeleton
        data={(serializedData.allLikes, serializedData.recipes)}
      >
        {layout === "grid" ? (
          <RecipeGrid
            allLikes={serializedData.allLikes}
            recipes={serializedData.recipes}
            currentUserId={currentUserId}
            deleteButton={isDeletable}
          />
        ) : (
          <div className="flex">
            <RecipeCarousel
              allLikes={serializedData.allLikes}
              recipes={serializedData.recipes}
              currentUserId={currentUserId}
              deleteButton={isDeletable}
            />
          </div>
        )}
      </ContentWithSkeleton>
    </div>
  );
}

export default RecipeSection;
