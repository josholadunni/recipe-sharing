import { fetchAllRecipes, fetchRecipeById } from "../../../lib/data";
import H1 from "../../../components/H1";
import Image from "next/image";

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
    const categories = recipe.RecipeCategories;
    return (
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category.name}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <H1 text={recipe.name}></H1>
      <div className="relative h-72 w-60">
        <Image
          src={recipe.imageURL}
          alt={recipe.title + " recipe"}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div class="font-bold">{renderCategories()}</div>
      <div>{renderIngredients()}</div>
      <div>{renderMethod()}</div>
    </div>
  );
}
