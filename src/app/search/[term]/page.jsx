import H1 from "../../components/H1";
import { search } from "../../lib/actions";
import { fetchRecipeLikes, findUserIdFromEmail } from "../../lib/data";
import RecipeCard from "../../components/RecipeCard";
import { render } from "react-dom";
export default async function SearchPage(props) {
  const { term } = props.params;
  let renderedRecipes = undefined;

  const recipeList = await search(term);
  const allLikes = await fetchRecipeLikes();
  const currentUserId = await findUserIdFromEmail();

  if (recipeList) {
    renderedRecipes = recipeList.map((recipe, index) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);

      console.log(recipeList);

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
  }

  return (
    <div>
      <H1 text={`${term} Recipes`}></H1>
      {renderedRecipes}
    </div>
  );
}
