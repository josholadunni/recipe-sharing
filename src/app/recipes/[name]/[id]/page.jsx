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
          <H2 text={"Ingredients"} />
        </div>
        <div className="bg-white rounded-2xl md:mr-4">
          <ul className="list-disc">
            {ingredients.map((ingredient, index) => (
              <li className="mb-3" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const renderMethod = () => {
    const method = recipe.method;
    return (
      <>
        <H2 text={"Method"} />
        <div className="bg-white rounded-2xl mr-4">
          <ul className="list-decimal">
            {method.map((methodStep, index) => (
              <li className="mb-3" key={index}>
                {methodStep}
              </li>
            ))}
          </ul>
        </div>
      </>
    );
  };

  const username = recipe.username.toLowerCase();

  const renderCategories = () => {
    return recipe.RecipeCategories.map((category, index) => {
      const categoryId = category.id;
      const categoryName = category.name;

      return (
        <Link
          key={index}
          className="bg-neutral-200 border-neutral-200 hover:bg-neutral-900 hover:text-white rounded-full border-[1px] py-1 px-4 mr-2 my-1 text-sm text-black"
          href={`/categories/${categoryName.toLowerCase()}/${categoryId}`}
        >
          {categoryName}
        </Link>
      );
    });
  };

  return (
    <div className="flex flex-wrap w-full px-16 justify-center relative top-8 bg-white rounded-t-2xl shadow-md">
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
          <div className="mx-auto">
            <Image
              src={recipe.imageURL}
              alt={recipe.title + " recipe"}
              width={350}
              height={350}
              className="object-cover rounded-t-lg"
            />
            <div className="mt-7">{recipe.short_description}</div>
            <div className="mt-7">{renderCategories()}</div>
          </div>
          <div className="w-screen mt-10 px-10 pb-20 rounded-3xl">
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
      <div className="min-w-[25rem] hidden sm:block sm:w-full mt-10 border-b-[1.5px] border-b-[#E4E4E7] pb-10">
        <div className="flex flex-row justify-center md:justify-start w-full relative">
          <div className="flex basis-1/4 justify-center items-center">
            <div className="aspect-square w-[350px] relative">
              <Image
                src={recipe.imageURL}
                alt={recipe.title + " recipe"}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="flex flex-col align-middle my-auto basis-3/4 ml-14">
            {
              <>
                <h1
                  style={{ fontWeight: 900 }}
                  className="text-3xl font-medium"
                >
                  {recipe.name}
                </h1>
                <div className="py-4 flex flex-wrap">{renderCategories()}</div>
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
          </div>
        </div>
      </div>

      {/* Ingredients and method section */}
      <div className="w-full min-h-fit md:pt-6 pb-28">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-[200px] border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-b-[#E4E4E7] pb-4">
            {renderIngredients()}
          </div>
          <div className="flex flex-col md:ml-14">{renderMethod()}</div>
        </div>
      </div>
    </div>
  );
}
