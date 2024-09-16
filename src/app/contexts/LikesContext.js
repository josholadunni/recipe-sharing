"use client";
import { createContext, useContext, useState } from "react";

const LikesContext = createContext();

export function LikesProvider({ children }) {
  const [allLikes, setAllLikes] = useState([]);

  return (
    <LikesContext.Provider value={{ allLikes, setAllLikes }}>
      {children}
    </LikesContext.Provider>
  );
}

export function useLikes() {
  return useContext(LikesContext);
}
