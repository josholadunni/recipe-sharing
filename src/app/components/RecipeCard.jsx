"use client";
import React from "react";
import Image from "next/image";
import "../../styles/RecipeCard.css";
import { createLike, removeLike } from "../lib/actions";
import Link from "next/link";

const RecipeCard = (props) => {
  const { isLiked, ...otherProps } = props;
  const categories = props.categories.map((category) => {
    const categoryId = category[1];
    const categoryName = category[0];
    return (
      <Link
        className="mr-2"
        href={`categories/${categoryName.toLowerCase()}/${categoryId}`}
      >
        {categoryName}
      </Link>
    );
  });

  return (
    <div className="flex flex-col shadow-lg w-72">
      <Link href={`/recipes/${props.id}`}>
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
        <Link href={`/recipes/${props.id}`}>
          <h2 className="text-lg font-bold mb-2">{props.title}</h2>
        </Link>
        <div className="mt-auto">
          <button
            onClick={
              isLiked
                ? () => removeLike(otherProps)
                : () => createLike(otherProps)
            }
            className={`border border-black rounded ${
              isLiked
                ? "bg-black text-white hover:bg-white hover:text-black"
                : "bg-white text-black hover:bg-black hover:text-white"
            }`}
          >
            <span className="p-6">{isLiked ? "Unlike" : "Like"}</span>
          </button>
          <span className="ml-2">{props.likes} likes</span>
        </div>

        <p className="mt-4">{props.description}</p>
        <div className="mt-auto">
          <p className="mt-2">{categories}</p>
          <p>{props.username}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
