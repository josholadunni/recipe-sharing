import { fetchAllRecipes, fetchRecipeById } from "../../../lib/data";
import H1 from "../../../components/H1";
import H2 from "../../../components/H2";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const recipes = await fetchAllRecipes();
  return recipes.map((recipe) => ({
    name: recipe.dataValues.name.toString().replace(/\s+/g, "-").toLowerCase(),
    id: recipe.dataValues.id.toString(),
  }));
}

export default async function RecipePage(params) {
  const { name, id } = params.params;
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  const renderIngredients = () => {
    const ingredients = recipe.ingredients;
    return (
      <>
        <div>
          <h2 style={{ fontWeight: 600 }} className="text-left text-xl mb-3">
            Ingredients
          </h2>
        </div>
        <ul>
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </>
    );
  };

  const renderMethod = () => {
    const method = recipe.method;
    return (
      <>
        <h2 style={{ fontWeight: 600 }} className="text-left text-xl my-4">
          Method
        </h2>
        <ul>
          {method.map((methodStep, index) => (
            <li key={index}>{methodStep}</li>
          ))}
        </ul>
      </>
    );
  };

  const username = recipe.username.toLowerCase();

  const renderCategories = () => {
    return recipe.RecipeCategories.map((category, index) => {
      const categoryId = category.id;
      const categoryName = category.name;

      let bgColor = undefined;
      let getCategoryColor = () => {
        if (categoryName.toLowerCase() == "quick & easy") {
          bgColor = "bg-sky-500";
        } else if (categoryName.toLowerCase() == "breakfast") {
          bgColor = "bg-orange-500";
        } else if (categoryName.toLowerCase() == "meat") {
          bgColor = "bg-red-500";
        } else if (categoryName.toLowerCase() == "vegetarian") {
          bgColor = "bg-emerald-500";
        } else if (categoryName.toLowerCase() == "vegan") {
          bgColor = "bg-lime-500";
        } else if (categoryName.toLowerCase() == "budget-friendly") {
          bgColor = "bg-orange-500";
        } else if (categoryName.toLowerCase() == "dessert") {
          bgColor = "bg-purple-500";
        }
      };
      getCategoryColor();

      return (
        <Link
          key={index}
          className="bg-neutral-200 border-neutral-200 hover:bg-neutral-900 hover:text-white rounded-full border-[1px] py-1 px-4 mr-2 my-1 text-sm text-black"
          href={`/categories/${categoryName.toLowerCase()}/${categoryId}`}
        >
          <span
            className={`inline-block w-2 h-2 ${bgColor} rounded-full mr-2`}
          ></span>
          {categoryName}
        </Link>
      );
    });
  };

  return (
    <div className="flex flex-wrap w-full justify-center relative top-12 mx-auto px-10">
      {/* Mobile */}
      <div className="min-w-[20rem] md:w-1/3 sm:hidden">
        <H1 text={recipe.name}></H1>
        <div className="flex mt-2 justify-center">
          <Link
            className="text-center text-orange-600 underline text-under"
            href={`/users/${username}`}
          >
            {username}
          </Link>
        </div>
        <div className="flex flex-col justify-center mt-5 w-full relative">
          <div class="mx-auto">
            <Image
              src={recipe.imageURL}
              alt={recipe.title + " recipe"}
              width={350}
              height={350}
              className="object-cover rounded-t-lg"
            />
            <div className="mt-7">{renderCategories()}</div>
            <div className="flex-1 mt-7 min-w-[20rem] md:w-1/3">
              {renderIngredients()}
            </div>
            <div className="flex-1 min-w-[20rem] md:w-1/3 mt-6">
              {renderMethod()}
            </div>
          </div>
        </div>
      </div>
      {/* Larger */}
      <div className="min-w-[25rem] hidden sm:block sm:w-full">
        <div className="flex flex-row justify-center mt-12 w-full relative">
          <div className="basis-1/2 justify-center">
            <Image
              src={recipe.imageURL}
              alt={recipe.title + " recipe"}
              width={350}
              height={350}
              className="object-cover rounded-t-lg"
            />
          </div>
          <div className="flex flex-col align-middle my-auto basis-1/2 ml-7">
            {
              <>
                <h1
                  style={{ fontWeight: 900 }}
                  className="text-3xl font-medium pb-3"
                >
                  {recipe.name}
                </h1>
                <div className="flex">
                  <Link
                    className="text-center text-orange-600 underline text-under"
                    href={`/users/${username}`}
                  >
                    {username}
                  </Link>
                </div>
              </>
            }
            <div className="mt-10">{recipe.short_description}</div>
            <div className="mt-7">{renderCategories()}</div>
          </div>
        </div>

        {/* Ingredients and method section */}
        <div className="flex flex-col pl-5">
          <div className="flex flex-col basis-1/2 mt-10">{renderMethod()}</div>
          <div className="basis 1/2 mt-10">{renderIngredients()}</div>
        </div>
      </div>
    </div>
  );
}
