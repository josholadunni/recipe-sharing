import { fetchRecipesByCategoryId } from "../../../lib/data";
export default async function CategoryPage(params) {
  const { name, id } = params.params;

  console.log(await fetchRecipesByCategoryId(id));

  return <h1>Category: {name}</h1>;
}
