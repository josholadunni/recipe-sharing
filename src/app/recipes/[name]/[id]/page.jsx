import { Suspense } from "react";
import { fetchAllRecipes } from "../../../lib/data";
import RecipeHeader from "./RecipeHeader";
import RecipeDetails from "./RecipeDetails";

export async function generateStaticParams() {
  const recipes = await fetchAllRecipes();
  return recipes.map((recipe) => ({
    name: recipe.dataValues.name.toString().replace(/\s+/g, "-").toLowerCase(),
    id: recipe.dataValues.id.toString(),
  }));
}

export default async function RecipePage(params) {
  const { id } = params.params;

  return (
    <div className="flex flex-wrap w-full mt-10 px-8 justify-center bg-red rounded-t-2xl shadow-md">
      {/* Recipe Header - Mobile */}
      <Suspense
        fallback={
          <div className="min-w-[20rem] w-full md:w-1/3 sm:hidden">
            Loading recipe...
          </div>
        }
      >
        <RecipeHeader id={id} isMobile={true} />
      </Suspense>

      {/* Recipe Header - Larger Screens */}
      <Suspense
        fallback={
          <div className="min-w-[25rem] hidden sm:block sm:w-full mt-10 border-b-[1.5px] border-b-[#E4E4E7] pb-10">
            Loading recipe...
          </div>
        }
      >
        <RecipeHeader id={id} isMobile={false} />
      </Suspense>

      {/* Ingredients and method section */}
      <div className="w-full min-h-fit md:pt-6 pb-10">
        <div className="flex flex-col md:flex-row">
          <Suspense
            fallback={
              <div className="md:w-[250px] lg:w-[350px] border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-b-[#E4E4E7] pb-4">
                Loading ingredients...
              </div>
            }
          >
            <RecipeDetails id={id} section="ingredients" />
          </Suspense>

          <Suspense
            fallback={
              <div className="flex flex-col md:ml-14">Loading method...</div>
            }
          >
            <RecipeDetails id={id} section="method" />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
