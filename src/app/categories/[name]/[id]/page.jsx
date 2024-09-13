import { fetchRecipesByCategoryId } from "../../../lib/data";
import RecipeCard from "../../../components/RecipeCard";
import H1 from "../../../components/H1";
import { fetchRecipeLikes } from "../../../lib/data";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { fetchRecipeCategoriesByRecipeId } from "../../../lib/data";

export default async function CategoryPage(params) {
  let likeRecipeId = undefined;
  let renderedRecipes = undefined;
  const { name, id } = params.params;

  const recipeList = await fetchRecipesByCategoryId(id);

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

      // console.log(categories);

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
          isLiked={likeRecipeId.includes(recipe.id)}
        />
      );
    });
  }

  return (
    <>
      <H1 text={`${capitalizeFirstLetter(name)} Recipes`}></H1>
      {renderedRecipes}
    </>
  );
}
