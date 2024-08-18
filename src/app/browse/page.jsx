import H1 from "../components/H1";
import RecipeCategoryGrid from "../components/RecipeCategoryGrid";
import { RecipeCategory } from "../lib/models";
import { fetchRecipeCategories } from "../lib/data";

export default async function Browse() {
  return (
    <div>
      <H1 text="Browse" />
      <RecipeCategoryGrid categories={fetchRecipeCategories()} />
    </div>
  );
}
