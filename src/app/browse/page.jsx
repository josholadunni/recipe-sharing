import H1 from "../components/H1";
import RecipeCategoryGrid from "../components/RecipeCategoryGrid";
import { RecipeCategory } from "../lib/models";
import { fetchRecipeCategories } from "../lib/data";

export default async function Browse() {
  return (
    <div className="relative top-12">
      <H1 text="Browse Recipes" />
      <div className="mt-10 flex justify-center">
        <RecipeCategoryGrid categories={fetchRecipeCategories()} />
      </div>
    </div>
  );
}
