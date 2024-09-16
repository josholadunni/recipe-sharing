import H1 from "../../components/H1";
import {
  findUserFromUsername,
  fetchAllUsers,
  fetchRecipesByUserId,
  fetchRecipeLikes,
} from "../../lib/data";
import RecipeCard from "../../components/RecipeCard";
import { findUserIdFromEmail } from "../../lib/data";

export async function generateStaticParams() {
  const users = await fetchAllUsers();
  return users.map((user) => ({
    name: user.dataValues.name,
  }));
}

export default async function UserPage(params) {
  const { name } = params.params;
  const user = await findUserFromUsername(name);
  const userId = user.result.id;
  let renderedRecipes = undefined;

  if (!user) {
    return <div>User not found</div>;
  }

  const recipeList = await fetchRecipesByUserId(userId);
  const allLikes = await fetchRecipeLikes();
  const currentUserId = await findUserIdFromEmail();

  if (recipeList) {
    renderedRecipes = recipeList.map((recipe, index) => {
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
          allLikes={allLikes}
          currentUserId={currentUserId}
          categories={categories}
          username={recipe.username}
          slug={recipe.name.replace(/\s+/g, "-").toLowerCase()}
        />
      );
    });

    return (
      <>
        <H1 text={`${user.result.username}'s Recipes`}></H1>
        {renderedRecipes}
      </>
    );
  }
}
