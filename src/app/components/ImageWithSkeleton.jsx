"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";
import { Skeleton } from "@nextui-org/skeleton";

function ImageWithSkeleton(props) {
  const recipe = props.data;
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Skeleton isLoaded={isLoaded} className="rounded-lg relative w-full h-full">
      <Image
        src={recipe.imageURL}
        alt={recipe.title + " recipe"}
        fill
        className="object-cover rounded-t-lg"
        onLoad={() => {
          setIsLoaded(true);
        }}
      />
    </Skeleton>
  );
}

export default ImageWithSkeleton;
