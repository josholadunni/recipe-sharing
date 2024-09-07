import H1 from "../../components/H1";
import {
  findUserFromUsername,
  fetchAllUsers,
  fetchRecipesByUserId,
  fetchRecipeLikes,
} from "../../lib/data";
import RecipeCard from "../../components/RecipeCard";

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
  let likeRecipeId = undefined;
  let renderedRecipes = undefined;

  if (!user) {
    return <div>User not found</div>;
  }

  const recipeList = await fetchRecipesByUserId(userId);

  const allLikes = await fetchRecipeLikes();
  if (allLikes) {
    likeRecipeId = allLikes.map((like) => like.dataValues.RecipeId);
  }

  if (recipeList) {
    renderedRecipes = recipeList.map((recipe) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);

      return (
        <RecipeCard
          key={recipe.dataValues.id}
          id={recipe.dataValues.id}
          title={recipe.dataValues.name}
          imgFileName={recipe.dataValues.imageURL}
          description={recipe.dataValues.short_description}
          likes={likeRecipeId.filter((like) => like === recipe.id).length}
          categories={categories}
          username={recipe.username}
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
