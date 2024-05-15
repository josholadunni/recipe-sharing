"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import "../../styles/RecipeCard.css";

const RecipeCard = (props) => {
  const [orientation, setOrientation] = useState("portrait");

  const handleImageLoad = (event) => {
    console.log("Image loaded");
    const { naturalWidth, naturalHeight } = event.target;
    const newOrientation =
      naturalWidth - 100 > naturalHeight ? "landscape" : "portrait";
    setOrientation(newOrientation);
  };

  return (
    <div className="recipe-card-container">
      <div className={`recipe-card`}>
        <div className={`recipe-card-image-container-${orientation}`}>
          <Image
            width={300}
            height={300}
            className={`recipe-card-image-${orientation}`}
            src={"/images/" + props.imgFileName}
            alt={props.title + " recipe"}
            onLoadingComplete={handleImageLoad}
          />
        </div>
        <div className="recipe-card-bottom">
          <div className="recipe-card-title-likes">
            <h2 className="recipe-card-title">{props.title}</h2>
            <div className="recipe-card-likes">
              <button>Like</button>
              100 Likes
            </div>
          </div>
          <p className="recipe-card-description">{props.description}</p>
          <p>
            {props.categories.map((category) => {
              return `${category} `;
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
