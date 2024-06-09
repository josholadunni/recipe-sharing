"use client";
import React from "react";
import Image from "next/image";
import "../../styles/RecipeCard.css";

const RecipeCard = (props) => {
  const categories = props.categories.map((category) => {
    return <span key={category}>{category} </span>;
  });
  return (
    <div className="flex flex-col shadow-lg w-72">
      <div className="relative h-60">
        <Image
          src={"/images/" + props.imgFileName}
          alt={props.title + " recipe"}
          fill={true}
          className="object-cover"
        />
      </div>
      <div className="flex flex-col p-4 flex-none">
        <h2 className="text-lg font-bold mb-2">{props.title}</h2>
        <div className="mt-auto">
          <button className=" bg-white text-black border border-black rounded hover:bg-black hover:text-white">
            <span className="p-6">Like</span>
          </button>
          <span className="ml-2 ">100 Likes</span>
        </div>

        <p className="mt-4">{props.description}</p>
        <div className="mt-auto">
          <p className="mt-2">{categories}</p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
