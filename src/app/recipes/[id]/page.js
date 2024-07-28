import { fetchRecipeById } from "../../lib/data";
import { fetchAllRecipeIds } from "../../lib/data";
import H1 from "../../components/H1";
import Image from "next/image";

export async function generateStaticParams() {
  const recipeIds = await fetchAllRecipeIds();

  return recipeIds.map((id) => ({
    id: id.toString(),
  }));
}

export default async function RecipePage(params) {
  const recipe = await fetchRecipeById(params.params.id);

  console.log(recipe);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

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
    </div>
  );
}
