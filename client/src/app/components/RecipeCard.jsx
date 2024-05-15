"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";
import "../../styles/RecipeCard.css";

const RecipeCard = (props) => {
  return (
    <div className="recipe-card-container">
      <div className="recipe-card-img">
        <Image
          src={"/images/" + props.imgFileName}
          alt={props.title + " recipe"}
          fill={true}
          style={{ objectFit: "cover" }}
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
  );
};

export default RecipeCard;
