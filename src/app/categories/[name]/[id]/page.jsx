import { fetchRecipesByCategoryId } from "../../../lib/data";
import H1 from "../../../components/H1";
import { fetchRecipeLikes } from "../../../lib/data";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { findUserIdFromEmail } from "../../../lib/data";
import RecipeGrid from "../../../components/Home/RecipeGrid";

export default async function CategoryPage(params) {
  const { name, id } = params.params;

  const recipeList = await fetchRecipesByCategoryId(id);
  const allLikes = await fetchRecipeLikes();
  const currentUserId = await findUserIdFromEmail();

  return (
    <div className="relative top-12">
      <H1
        text={`${decodeURIComponent(capitalizeFirstLetter(name))} Recipes`}
      ></H1>
      <div className="mt-10 flex justify-center">
        <RecipeGrid
          allLikes={allLikes}
          currentUserId={currentUserId}
          recipes={recipeList}
          deleteButton={false}
        />
      </div>
    </div>
  );
}
