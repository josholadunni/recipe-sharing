"use client";
import React from "react";
import { useEffect } from "react";
import RecipeCard from "../RecipeCard.jsx";
import useEmblaCarousel from "embla-carousel-react";
import "../../../styles/RecipeCarousel.css";

export default function RecipeGrid({
  allLikes,
  recipes,
  currentUserId,
  deleteButton,
}) {
  let renderedRecipeCards = undefined;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  useEffect(() => {
    if (emblaApi) {
      console.log(emblaApi.slideNodes());
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
          <div className="embla__slide">
            <RecipeCard
              key={index}
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
          <div className="embla__slide">
            <RecipeCard
              key={index}
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
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">{renderedRecipeCards}</div>
    </div>
  );
}
