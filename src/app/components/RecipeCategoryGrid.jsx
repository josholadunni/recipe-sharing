import Link from "next/link";
import { fetchRecipeCategories } from "../lib/data";
import ContentWithSkeleton from "./Wrappers/ContentWithSkeleton";

export default async function RecipeCategoryGrid(props) {
  const categories = await fetchRecipeCategories();

  const serializedCategories = JSON.parse(JSON.stringify(categories));

  const recipeCategories = serializedCategories.map((category) => category);

  const categoryElements = recipeCategories.map((category, index) => {
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
      <ContentWithSkeleton data={serializedCategories}>
        <div
          className={`flex flex-col justify-center align-middle rounded-xl `}
        >
          <Link
            key={index}
            href={`categories/${category.name.toLowerCase()}/${category.id}`}
            className="flex flex-col"
          >
            <div
              className={`${bgColor} w-40 h-40 md:w-52 md:h-52 mx-auto rounded-lg`}
            ></div>
            <p className={`font-bold text-lg text-center ${textColor} mt-4`}>
              {category.name}
            </p>
          </Link>
        </div>
      </ContentWithSkeleton>
    );
  });

  return <div className="flex gap-2 w-full">{categoryElements}</div>;
}
