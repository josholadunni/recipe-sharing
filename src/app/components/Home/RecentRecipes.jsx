import React from "react";
import RecipeCard from "../RecipeCard.jsx";
import fetchRecentRecipes from "../../../app/lib/data.js";
import { fetchRecipeLikes } from "../../../app/lib/data.js";
import { findUserIdFromEmail } from "../../../app/lib/data.js";
import { auth } from "../../auth.js";

export default async function RecentRecipes() {
  let renderedRecipeCards = undefined;
  let likeRecipeId = undefined;
  const session = await auth();
  console.log(session);
  const allRecipes = await fetchRecentRecipes();
  const allLikes = await fetchRecipeLikes();
  const currentUserId = session?.user?.email
    ? await findUserIdFromEmail(session.user.email)
    : null;
  if (allLikes) {
    likeRecipeId = allLikes.map((like) => like.dataValues.RecipeId);
  }

  console.log(session);

  const hasLiked = (recipeId) => {
    if (allLikes && allLikes.length > 0) {
      return allLikes.some(
        (like) =>
          like.User.id === currentUserId.result &&
          like.dataValues.RecipeId === recipeId
      );
    }
    return false;
  };

  if (allRecipes) {
    renderedRecipeCards = allRecipes.map((recipe, index) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);
      return (
        <RecipeCard
          key={index}
          id={recipe.id}
          title={recipe.name}
          imgFileName={recipe.imageURL}
          description={recipe.short_description}
          likes={likeRecipeId.filter((like) => like === recipe.id).length}
          categories={categories}
          username={recipe.username}
          isLiked={hasLiked(recipe.id)}
          slug={recipe.name.replace(/\s+/g, "-").toLowerCase()}
        />
      );
    });
  }
  return <div className="recipe-grid">{renderedRecipeCards}</div>;
}
