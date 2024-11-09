import Link from "next/link";
export default async function RecipeCategoryGrid(props) {
  const recipeCategories = (await props.categories).map(
    (category) => category.dataValues
  );

  const categoryElements = recipeCategories.map((category, index) => {
    let bgColor = undefined;
    let textColor = undefined;
    let getCategoryColor = () => {
      if (category.name.toLowerCase() == "vegetarian") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "brunch") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "american") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "italian") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "breakfast") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "lunch") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "budget-friendly") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "dessert") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      } else if (category.name.toLowerCase() == "dinner") {
        bgColor = "bg-orange-400";
        textColor = "text-orange-900";
      }
    };
    getCategoryColor();
    return (
      <Link
        key={index}
        href={`categories/${category.name.toLowerCase()}/${category.id}`}
        className={`flex flex-col justify-center align-middle min-h-72 w-[22rem] rounded-xl ${bgColor} `}
      >
        <p className={`font-bold text-lg text-center ${textColor}`}>
          {category.name}
        </p>
      </Link>
    );
  });

  return (
    <div className="grid grid-cols-1 gap-y-8 md:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 recipe-grid justify-items-center">
      {categoryElements}
    </div>
  );
}
