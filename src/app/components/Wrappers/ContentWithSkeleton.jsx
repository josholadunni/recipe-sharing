"use client";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@nextui-org/skeleton";

function ContentWithSkeleton({ children, data, fallback, className = "" }) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (data) {
      // Delay to make transition smoother
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setIsLoaded(false);
    }
  }, [data]);

  return (
    <Skeleton isLoaded={isLoaded} className={className}>
      {children}
    </Skeleton>
  );
}

export default ContentWithSkeleton;
