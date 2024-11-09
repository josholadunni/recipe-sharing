import { fetchAllRecipes, fetchRecipeById } from "../../../lib/data";
import H1 from "../../../components/H1";
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
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    );
  };

  const renderMethod = () => {
    const method = recipe.method;
    return (
      <ul>
        {method.map((methodStep, index) => (
          <li key={index}>{methodStep}</li>
        ))}
      </ul>
    );
  };

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
    <div className="flex flex-col relative top-12 mx-20 sm:mx-36 md:mx-30">
      <H1 text={recipe.name}></H1>
      <div className="flex justify-center mt-10 w-auto h-96 relative">
        <Image
          src={recipe.imageURL}
          alt={recipe.title + " recipe"}
          width={500}
          height={500}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="font-bold mt-6">{renderCategories()}</div>
      <div>{renderIngredients()}</div>
      <div>{renderMethod()}</div>
    </div>
  );
}
