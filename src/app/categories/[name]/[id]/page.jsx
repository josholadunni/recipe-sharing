import { fetchRecipesByCategoryId } from "../../../lib/data";
import H1 from "../../../components/H1";
import { fetchRecipeLikes } from "../../../lib/data";
import { capitalizeFirstLetter } from "../../../lib/utils";
import { findUserIdFromEmail } from "../../../lib/data";
import RecipeGrid from "../../../components/Home/RecipeGrid";
import RecipeSection from "../../../components/RecipeSection";

export default async function CategoryPage(params) {
  const { name, id } = await params.params;

  try {
    const currentUserId = await findUserIdFromEmail();
    // const [recipeList, allLikes, currentUserId] = await Promise.all([
    //   fetchRecipesByCategoryId(id),
    //   fetchRecipeLikes(),
    //   findUserIdFromEmail(),
    // ]);

    return (
      <div className="relative top-12">
        <div className="mt-10">
          <H1
            text={`${decodeURIComponent(capitalizeFirstLetter(name))} Recipes`}
          ></H1>
          <RecipeSection
            currentUserId={currentUserId}
            fetchRecipeLikes={fetchRecipeLikes}
            fetchRecipes={fetchRecipesByCategoryId}
            categoryId={id}
            isDeletable={false}
            layout={"grid"}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error loading category page:", error);
    return <div>Error loading recipes. Please try again later.</div>;
  }
}
