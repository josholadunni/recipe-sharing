"use client";
import React from "react";
import Image from "next/image";
import "../../styles/RecipeCard.css";
import { createLike, removeLike } from "../lib/actions";
import Link from "next/link";
import { formatDate, titleCase } from "../lib/utils";
import H3 from "./H3.jsx";

const RecipeCard = (props) => {
  const { allLikes, currentUserId, id, createdAt } = props;

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
        className="mr-2"
        href={`/categories/${categoryName.toLowerCase()}/${categoryId}`}
      >
        {categoryName}
      </Link>
    );
  });

  const formattedDate = formatDate(createdAt);
  const formattedTitle = titleCase(props.title);

  return (
    <div className="flex flex-col shadow-lg w-72">
      <Link href={`/recipes/${props.slug}/${props.id}`}>
        <div className="relative h-60">
          <Image
            src={props.imgFileName}
            alt={props.title + " recipe"}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col p-4 flex-none">
        <Link href={`/recipes/${props.slug}/${props.id}`}>
          <H3 text={formattedTitle} />
        </Link>
        <div className="mt-auto">
          <button
            onClick={
              isLiked ? () => removeLike(props) : () => createLike(props)
            }
            className={`border border-black rounded-full ${
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
          <p className="mt-2 flex flex-wrap">{categories}</p>
          <Link href={`/users/${props.username}`}>{props.username}</Link>
        </div>
        <p>{formattedDate}</p>
      </div>
    </div>
  );
};

export default RecipeCard;
