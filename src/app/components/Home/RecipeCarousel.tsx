"use client";
import React, { useCallback } from "react";
import { useEffect } from "react";
import RecipeCard from "../RecipeCard.js";
import useEmblaCarousel from "embla-carousel-react";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import "../../../styles/RecipeCarousel.css";
import { RecipeLayoutType } from "../../lib/types/Recipe.js";

export default function RecipeGrid({
  allLikes,
  recipes,
  currentUserId,
  deleteButton,
}: RecipeLayoutType) {
  let renderedRecipeCards = undefined;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false }, [
    WheelGesturesPlugin(),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
    }
  }, [emblaApi]);

  if (recipes) {
    const totalRecipes = recipes.length;
    renderedRecipeCards = recipes.map((recipe, index) => {
      const categories = recipe.RecipeCategories.map((category) => [
        category.name,
        category.id,
      ]);

      if (deleteButton) {
        return (
          <div className="embla__slide" key={index}>
            <RecipeCard
              id={recipe.id}
              title={recipe.name}
              imgFileName={recipe.imageURL}
              description={recipe.short_description}
              allLikes={allLikes}
              currentUserId={currentUserId}
              categories={categories}
              username={recipe.username}
              slug={recipe.name.replace(/\s+/g, "-").toLowerCase()}
              createdAt={recipe.createdAt}
              deletable={true}
            />
          </div>
        );
      } else {
        return (
          <div className="embla__slide" key={index}>
            <RecipeCard
              id={recipe.id}
              title={recipe.name}
              imgFileName={recipe.imageURL}
              description={recipe.short_description}
              allLikes={allLikes}
              currentUserId={currentUserId}
              categories={categories}
              username={recipe.username}
              slug={recipe.name.replace(/\s+/g, "-").toLowerCase()}
              createdAt={recipe.createdAt}
              deletable={false}
            />
          </div>
        );
      }
    });
  }
  return (
    <div className="carousel">
      <div className="embla">
        {/* <button className="embla__button embla__prev" onClick={scrollPrev}>
          <svg className="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
            />
          </svg>
        </button> */}
        {/* <button className="embla__button embla__next" onClick={scrollNext}>
          <svg className="embla__button__svg" viewBox="0 0 532 532">
            <path
              fill="currentColor"
              d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
            />
          </svg>
        </button> */}
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">{renderedRecipeCards}</div>
        </div>
      </div>
    </div>
  );
}
