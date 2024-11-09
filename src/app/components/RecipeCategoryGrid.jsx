import Link from "next/link";
export default async function RecipeCategoryGrid(props) {
  const recipeCategories = (await props.categories).map(
    (category) => category.dataValues
  );

  const categoryElements = recipeCategories.map((category, index) => {
    let bgColor = undefined;
    let textColor = undefined;
    let getCategoryColor = () => {
      if (category.name.toLowerCase() == "quick & easy") {
        bgColor = "bg-sky-500";
      } else if (category.name.toLowerCase() == "breakfast") {
        bgColor = "bg-orange-500";
      } else if (category.name.toLowerCase() == "meat") {
        bgColor = "bg-red-500";
      } else if (category.name.toLowerCase() == "vegetarian") {
        bgColor = "bg-emerald-500";
      } else if (category.name.toLowerCase() == "vegan") {
        bgColor = "bg-lime-500";
      } else if (category.name.toLowerCase() == "budget-friendly") {
        bgColor = "bg-orange-500";
      } else if (category.name.toLowerCase() == "dessert") {
        bgColor = "bg-purple-500";
      }
    };
    getCategoryColor();
    return (
      <div className={`flex flex-col justify-center align-middle rounded-xl `}>
        <Link
          key={index}
          href={`categories/${category.name.toLowerCase()}/${category.id}`}
          className="flex flex-col"
        >
          <div className={`${bgColor} w-40 h-40 md:w-52 md:h-52 mx-auto`}></div>
          <p className={`font-bold text-lg text-center ${textColor} mt-4`}>
            {category.name}
          </p>
        </Link>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-2 gap-8 gap-y-8 md:gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 recipe-grid justify-center">
      {categoryElements}
    </div>
  );
}
