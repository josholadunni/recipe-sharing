import Link from "next/link";
export default async function RecipeCategoryGrid(props) {
  const recipeCategories = (await props.categories).map(
    (category) => category.dataValues
  );

  const categoryElements = recipeCategories.map((category, index) => {
    return (
      <p>
        <Link
          key={index}
          href={`categories/${category.name.toLowerCase()}/${category.id}`}
        >
          {category.name}
        </Link>
      </p>
    );
  });

  return <div>{categoryElements}</div>;
}
