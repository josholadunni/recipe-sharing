"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import { createLike, removeLike } from "../lib/actions";
import Link from "next/link";
import { formatDate, titleCase } from "../lib/utils";
import H3 from "./H3.jsx";
import { deleteRecipe } from "../lib/actions";
import { Skeleton } from "@nextui-org/skeleton";

const RecipeCard = (props) => {
  const { allLikes, currentUserId, id, createdAt, deletable, isSmall } = props;

  const likeRecipeId = allLikes ? allLikes.map((like) => like.RecipeId) : [];

  const likes = likeRecipeId.filter((like) => like === id).length;

  const hasLiked = (recipeId) => {
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
        className="bg-neutral-200 border-neutral-200 hover:bg-neutral-900 hover:text-white rounded-full border-[1px] py-1 px-4 mr-2 my-1 text-sm text-black"
        href={`/categories/${categoryName.toLowerCase()}/${categoryId}`}
      >
        {categoryName}
      </Link>
    );
  });

  const formattedDate = formatDate(createdAt);
  const formattedTitle = titleCase(props.title);

  const [state, setState] = useState(null);

  const handleClick = async (id) => {
    let actionResult = undefined;
    if (
      window.confirm(
        "Are you sure you want to delete this recipes? This can't be undone."
      )
    ) {
      actionResult = await deleteRecipe(id);
    }
    setState(actionResult);
  };

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={`flex flex-col w-[250px] md:w-72 rounded-lg h-full border-[0.5px] border-recipe-gray-150 shadow-md bg-white ${
        props.className
      } ${
        isSmall &&
        "flex flex-col w-full xs:max-w-[180px] max-w-[300px] md:w-72 rounded-lg h-full border-[0.5px] border-recipe-gray-150 shadow-md bg-white"
      }`}
    >
      <div className="relative p-2 h-60">
        {deletable && (
          <>
            <button
              className="absolute top-2 right-2 z-[5] p-2 rounded-full bg-black/70 hover:bg-black transition-colors"
              onClick={() => handleClick(props.id)}
              title="Delete recipe"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="white"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </button>
            {state?.result && (
              <div className="absolute top-0 left-0 z-10 white">
                {state?.message}
              </div>
            )}
          </>
        )}

        <Link href={`/recipes/${props.slug}/${props.id}`}>
          <Skeleton
            isLoaded={isLoaded}
            className="rounded-lg relative w-full h-full"
          >
            <Image
              src={props.imgFileName}
              alt={props.title + " recipe"}
              fill={true}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-lg"
              onLoad={() => {
                setIsLoaded(true);
              }}
            />
          </Skeleton>
        </Link>
      </div>
      <div className="p-4">
        <div className="flex flex-row justify-between w-fullflex-none">
          <div className="flex flex-col">
            <Link
              className="hover:text-red-700"
              href={`/recipes/${props.slug}/${props.id}`}
            >
              <H3 text={formattedTitle} />
            </Link>
            <Link
              className="text-recipe-gray-200"
              href={`/users/${props.username}`}
            >
              {props.username}
            </Link>
          </div>
          <div
            className={`flex flex-col relative border-recipe-gray-100 border-1 ${
              isLiked && "border-t-white"
            }`}
          >
            <div className={`flex flex-row relative`}>
              <button
                onClick={
                  isLiked ? () => removeLike(props) : () => createLike(props)
                }
                className={`border-b-1 ${
                  isLiked && "rounded-md"
                } px-2 min-w-[61.4px] ${
                  isLiked
                    ? "bg-recipe-red border-recipe-red text-white hover:bg-red-500 hover:border-red-500 hover:text-white"
                    : "bg-white text-black hover:bg-recipe-gray-100 hover:text-white"
                }`}
              >
                <span
                  className={`p-1 text-sm ${
                    isLiked ? "text-white" : "text-recipe-red"
                  }`}
                >
                  {isLiked ? "Liked" : "Like"}
                </span>
              </button>
            </div>
            <div className="flex flex-row justify-center">
              <span className="text-sm">{likes} likes</span>
            </div>
          </div>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col">
            <p className="mt-2 flex flex-wrap">{categories}</p>
            <p className="mt-2 text-sm text-recipe-gray-200">{formattedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
