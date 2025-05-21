"use client";
import Image from "next/image";
import { createLike, removeLike } from "../lib/actions";
import { useState } from "react";
import { deleteRecipe } from "../lib/actions";
import Link from "next/link";
import { formatDate, titleCase } from "../lib/utils";
import { RecipeCardType } from "../lib/types/Recipe";

const RecipeCard = (props: RecipeCardType) => {
  const { allLikes, currentUserId, id, createdAt } = props;

  const likeRecipeId = allLikes ? allLikes.map((like) => like.RecipeId) : [];

  const likes = likeRecipeId.filter((like) => like === id).length;

  const hasLiked = (recipeId: number) => {
    if (allLikes && allLikes.length > 0) {
      return allLikes.some(
        (like) =>
          like.User.id === currentUserId?.result && like.RecipeId === recipeId
      );
    }
    return false;
  };

  const isLiked = hasLiked(id);

  const categories = props.categories.map((category, index) => {
    const categoryId = category[1];
    const categoryName = category[0];
    return (
      <Link
        key={index}
        className="mr-2"
        href={`/categories/${categoryName.toLowerCase()}/${categoryId}`}
      >
        {categoryName}
      </Link>
    );
  });

  const formattedDate = formatDate(createdAt);
  const formattedTitle = titleCase(props.title);

  const [state, setState] = useState<{
    status: string;
    message: string;
    result?: string;
  } | null>(null);

  const handleClick = async (id: number) => {
    const actionResult = await deleteRecipe(id);
    setState(actionResult);
  };

  return (
    <div className="flex flex-col shadow-lg w-72">
      <div className="relative h-60">
        <button
          className="bg-rose-500 absolute top-0 right-0 z-10"
          onClick={() => handleClick(props.id)}
        >
          Delete
        </button>
        {state?.result && (
          <div className="absolute top-0 left-0 z-10 white">
            {state?.message}
          </div>
        )}
        <Link href={`/recipes/${props.id}`}>
          <Image
            src={props.imgFileName}
            alt={props.title + " recipe"}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </Link>
      </div>
      <div className="flex flex-col p-4 flex-none">
        <Link href={`/recipes/${props.slug}/${props.id}`}>
          <h2 className="text-lg font-bold mb-2">{formattedTitle}</h2>
        </Link>
        <div className="mt-auto">
          <button
            onClick={
              isLiked ? () => removeLike(props) : () => createLike(props)
            }
            className={`border border-black rounded ${
              isLiked
                ? "bg-black text-white hover:bg-white hover:text-black"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            <span className="p-6">{isLiked ? "Unlike" : "Like"}</span>
          </button>
          <span className="ml-2">{likes} likes</span>
        </div>

        <p className="mt-4">{props.description}</p>
        <div className="mt-auto">
          <p className="mt-2">{categories}</p>
          <Link href={`/users/${props.username}`}>
            <p>{props.username}</p>
          </Link>
          <p>{formattedDate}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
