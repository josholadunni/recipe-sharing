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
      <RecipeHeader id={id} isMobile={true} />

      {/* Recipe Header - Larger Screens */}
      <RecipeHeader id={id} isMobile={false} />

      {/* Ingredients and method section */}
      <div className="w-full min-h-fit md:pt-6 pb-10">
        <div className="flex flex-col md:flex-row">
          <RecipeDetails id={id} section="ingredients" />
          <RecipeDetails id={id} section="method" />
        </div>
      </div>
    </div>
  );
}
