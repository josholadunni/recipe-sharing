"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";

function ContentWithSkeleton({ children, data, fallback, className = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      setIsLoaded(true);
    }
  }, [data]);

  return (
    <Skeleton isLoaded={isLoaded} className={className}>
      {isLoaded ? children : fallback}
    </Skeleton>
  );
}

export default ContentWithSkeleton;
