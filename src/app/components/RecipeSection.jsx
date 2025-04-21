"use client";
import React, { useEffect, useState } from "react";
import ContentWithSkeleton from "./Wrappers/ContentWithSkeleton";
import RecipeGrid from "./Home/RecipeGrid";
import RecipeCarousel from "./Home/RecipeCarousel";

function RecipeSection({
  currentUserId,
  fetchRecipeLikes,
  fetchRecipes,
  categoryId,
  isDeletable,
  layout,
}) {
  const [recipes, setRecipes] = useState(null);
  const [likes, setLikes] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    //Load recipes and update state once loaded
    async function loadRecipes() {
      try {
        const [allLikes, recipes] = await Promise.all([
          fetchRecipeLikes(),
          fetchRecipes(categoryId),
        ]);
        //Serialize data from data fetches
        const serializedData = {
          recipes: JSON.parse(JSON.stringify(recipes)),
          allLikes: JSON.parse(JSON.stringify(allLikes)),
          // currentUserId: currentUserId?.result || null,
        };
        //Update states with serialized data
        setRecipes(serializedData.recipes);
        setLikes(serializedData.allLikes);

        // Add a small delay to make the transition smoother
        setTimeout(() => {
          setIsLoaded(true);
        }, 300);
      } catch (error) {
        console.error("Error loading recipes:", error);
      }
    }

    loadRecipes();
  }, [fetchRecipeLikes, fetchRecipes, categoryId]);
  return (
    <div>
      <ContentWithSkeleton data={(likes, recipes)}>
        {layout === "grid" ? (
          <RecipeGrid
            allLikes={likes}
            recipes={recipes}
            currentUserId={currentUserId}
            deleteButton={isDeletable}
          />
        ) : (
          <div className="flex">
            <RecipeCarousel
              allLikes={likes}
              recipes={recipes}
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
