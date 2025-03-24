import { fetchRecipeById } from "../../../lib/data";
import H2 from "../../../components/H2";

export default async function RecipeDetails({ id, section }) {
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

  if (section === "ingredients") {
    const ingredients = recipe.ingredients;
    const filteredIngredients = ingredients.filter(
      (ingredient) =>
        ingredient !== "undefined" && !ingredient.includes("ingredient-")
    );

    return (
      <div className="md:w-[250px] lg:w-[350px] border-b-[1.5px] md:border-b-0 md:border-r-[1.5px] border-b-[#E4E4E7] pb-4">
        <div>
          <H2 text={"Ingredients"} />
        </div>
        <div className="rounded-2xl md:mr-4">
          <ul className="list-disc list-inside">
            {filteredIngredients.map((ingredient, index) => (
              <li className="mb-3" key={index}>
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  if (section === "method") {
    const method = recipe.method;
    const filteredMethod = method.filter(
      (method) => method !== "" && !method.includes("method-")
    );

    return (
      <div className="flex flex-col md:ml-14">
        <H2 text={"Method"} />
        <div className="rounded-2xl mr-4">
          <ul className="list-decimal list-inside">
            {filteredMethod.map((methodStep, index) => (
              <li className="mb-3" key={index}>
                {methodStep}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return null;
}
