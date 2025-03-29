import H1 from "../components/H1";
import RecipeCategoryGrid from "../components/RecipeCategoryGrid";

export default async function Browse() {
  return (
    <div className="relative top-12">
      <div className="mt-10">
        <H1 text="Browse Recipes" />
        <div className="flex justify-center">
          <RecipeCategoryGrid />
        </div>
      </div>
    </div>
  );
}
