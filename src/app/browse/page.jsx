import RecipeCategoryGrid from "../components/RecipeCategoryGrid";

export default async function Browse() {
  return (
    <div className="relative top-12">
      <div className="mt-10">
        <div className="flex justify-center">
          <RecipeCategoryGrid />
        </div>
      </div>
    </div>
  );
}
