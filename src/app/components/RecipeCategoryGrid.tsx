import Link from "next/link";
import { fetchRecipeCategories } from "../lib/data";
import ContentWithSkeleton from "./Wrappers/ContentWithSkeleton";
import H1 from "./H1";
import { RecipeCategoryType } from "../lib/types/Recipe";

export default async function RecipeCategoryGrid() {
  const categories = await fetchRecipeCategories();

  const serializedCategories = JSON.parse(JSON.stringify(categories));

  const recipeCategories = serializedCategories.map(
    (category: RecipeCategoryType) => category
  );

  const categoryElements = recipeCategories.map(
    (category: RecipeCategoryType, index: number) => {
      let bgColor = undefined;
      let textColor = undefined;
      let getCategoryColor = () => {
        if (category.name.toLowerCase() == "quick & easy") {
          bgColor = "bg-sky-500";
        } else if (category.name.toLowerCase() == "breakfast") {
          bgColor = "bg-orange-500";
        } else if (category.name.toLowerCase() == "meat") {
          bgColor = "bg-red-500";
        } else if (category.name.toLowerCase() == "vegetarian") {
          bgColor = "bg-emerald-500";
        } else if (category.name.toLowerCase() == "vegan") {
          bgColor = "bg-lime-500";
        } else if (category.name.toLowerCase() == "budget-friendly") {
          bgColor = "bg-orange-500";
        } else if (category.name.toLowerCase() == "dessert") {
          bgColor = "bg-purple-500";
        }
      };
      getCategoryColor();
      return (
        <div key={index} className="flex flex-col items-center">
          <Link
            href={`categories/${category.name.toLowerCase()}/${category.id}`}
            className="flex flex-col items-center"
          >
            <div
              className={`${bgColor} w-40 h-40 md:w-52 md:h-52 rounded-lg`}
            ></div>
            <p className={`font-bold text-lg text-center ${textColor} mt-4`}>
              {category.name}
            </p>
          </Link>
        </div>
      );
    }
  );

  return (
    <ContentWithSkeleton data={serializedCategories}>
      <div className="w-full">
        <H1 text="Browse Recipes" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full">
          {categoryElements}
        </div>
      </div>
    </ContentWithSkeleton>
  );
}
