"use client";
import React from "react";
import Image from "next/image";
import "../../styles/RecipeCard.css";
import { createLike } from "../lib/actions";
import { useState } from "react";
import { deleteRecipe } from "../lib/actions";

const RecipeCard = (props) => {
  const categories = props.categories.map((category) => {
    return <span key={category}>{category} </span>;
  });

  const [state, setState] = useState(null);

  const handleClick = async (id) => {
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
        <Image
          src={props.imgFileName}
          alt={props.title + " recipe"}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-4 flex-none">
        <h2 className="text-lg font-bold mb-2">{props.title}</h2>
        <div className="mt-auto">
          <button
            onClick={() => createLike(props)}
            className=" bg-white text-black border border-black rounded hover:bg-black hover:text-white"
          >
            <span className="p-6">Like</span>
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
