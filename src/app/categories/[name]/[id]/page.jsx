import { fetchRecipesByCategoryId } from "../../../lib/data";
import RecipeCard from "../../../components/RecipeCard";
import H1 from "../../../components/H1";
import { fetchRecipeLikes } from "../../../lib/data";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { findUserIdFromEmail } from "../../../lib/data";
import RecipeGrid from "../../../components/Home/RecipeGrid";

export default async function CategoryPage(params) {
  let renderedRecipes = undefined;
  const { name, id } = params.params;

  const recipeList = await fetchRecipesByCategoryId(id);
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
          createdAt={recipe.createdAt}
        />
      );
    });
  }

  return (
    <div className="relative top-12">
      <H1
        text={`${decodeURIComponent(capitalizeFirstLetter(name))} Recipes`}
      ></H1>
      <div className="mt-10 flex justify-center">{renderedRecipes}</div>
    </div>
  );
}
