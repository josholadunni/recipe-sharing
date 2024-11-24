import { fetchRecipesByCategoryId } from "../../../lib/data";
import H1 from "../../../components/H1";
import { fetchRecipeLikes } from "../../../lib/data";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { findUserIdFromEmail } from "../../../lib/data";
import RecipeGrid from "../../../components/Home/RecipeGrid";

export default async function CategoryPage(params) {
  const { name, id } = params.params;

  try {
    const [recipeList, allLikes, currentUserId] = await Promise.all([
      fetchRecipesByCategoryId(id),
      fetchRecipeLikes(),
      findUserIdFromEmail(),
    ]);

    const serializedData = {
      recipes: JSON.parse(JSON.stringify(recipeList)),
      allLikes: JSON.parse(JSON.stringify(allLikes)),
      currentUserId: currentUserId?.result || null,
    };
    return (
      <div className="relative top-12">
        <H1
          text={`${decodeURIComponent(capitalizeFirstLetter(name))} Recipes`}
        ></H1>
        <div className="mt-10 flex justify-center">
          <RecipeGrid
            allLikes={serializedData.allLikes}
            currentUserId={serializedData.currentUserId}
            recipes={serializedData.recipes}
            deleteButton={false}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading category page:", error);
    return <div>Error loading recipes. Please try again later.</div>;
  }
}
