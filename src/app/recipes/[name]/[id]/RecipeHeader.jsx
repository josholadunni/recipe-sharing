import { fetchRecipeById } from "../../../lib/data";
import H1 from "../../../components/H1";
import Link from "next/link";
import ImageWithSkeleton from "../../../components/ImageWithSkeleton";

export default async function RecipeHeader({ id, isMobile }) {
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    return <div>Recipe not found</div>;
  }

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

  if (isMobile) {
    return (
      <div className="min-w-[20rem] w-full md:w-1/3 sm:hidden">
        <div className="flex flex-col justify-center mt-5 w-full relative">
          <div className="aspect-square w-full sm:w-[500px] md:w-[350px] relative">
            <ImageWithSkeleton data={recipe} />
          </div>
          <div>
            <H1 text={recipe.name}></H1>
            <div className="flex mt-2">
              <Link
                className="text-center text-orange-600 underline text-under"
                href={`/users/${username}`}
              >
                {username}
              </Link>
            </div>
            <div className="mt-7">{recipe.short_description}</div>
            <div className="mt-7 flex flex-wrap">{renderCategories()}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-w-[25rem] hidden sm:block sm:w-full mt-10 border-b-[1.5px] border-b-[#E4E4E7] pb-10">
      <div className="flex flex-col md:flex-row justify-center md:justify-start w-full relative">
        <div className="flex basis-1/4 justify-center items-center">
          <div className="aspect-square sm:w-[500px] md:w-[350px] relative">
            <ImageWithSkeleton data={recipe} />
          </div>
        </div>
        <div className="flex flex-col align-middle my-auto basis-3/4 md:ml-14 sm:pt-5 md:pt-0">
          {
            <>
              <h1 style={{ fontWeight: 900 }} className="text-3xl font-medium">
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
          <div className="mt-4">{recipe.short_description}</div>
        </div>
      </div>
    </div>
  );
}
