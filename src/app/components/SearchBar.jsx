"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { search } from "../lib/actions";
import Link from "next/link";
import searchStyles from "./SearchBar.module.css";
import H3 from "./H3";

export default function SearchBar({ placeholder }) {
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  let [isResults, setIsResults] = useState(undefined);
  const router = useRouter();

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const newTimeoutId = setTimeout(async () => {
        try {
          const response = await search(searchTerm);
          response && setIsLoading(false);
          response.length == 0 ? setIsResults(false) : setIsResults(true);
          setResults(response);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }, 500);

      setTimeoutId(newTimeoutId);

      //Clears time out when the component is unmounted or the search term is changed
      return () => clearTimeout(newTimeoutId);
    }
  }, [searchTerm]);

  function handleInputChange(term) {
    //Clears the timeout if it exists
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    if (term) {
      setSearchTerm(term);
    } else {
      setIsResults(true);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    const input = e.target.firstChild;

    router.push(`/search/${input.value}`);
  }

  return (
    <div
      className="search-bar"
      onMouseLeave={() => {
        setResults([]);
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          className={`${searchStyles.searchInput} p-2 w-full rounded-md z-[60] outline-none`}
          type="text"
          placeholder={placeholder}
          onChange={(e) => {
            const term = e.target.value;
            handleInputChange(term);
            setResults([]);
          }}
        />
      </form>
      {isLoading && (
        <div className="results-container z-[50] flex flex-col left-1/2 -translate-x-1/2 bg-white shadow-md absolute w-screen md:w-auto md:min-w-[150px]">
          <h2 className="text-lg font-bold mb-2">Searching...</h2>
        </div>
      )}
      {results.length > 0 && (
        <div className="results-container z-[50] flex flex-col justify-center left-1/2 -translate-x-1/2 bg-white shadow-md absolute text-sm w-full md:w-auto md:min-w-[150px] min-h-[400px]">
          <div className="flex-2 justify-center text-center relative top-8">
            <H3 text="Recipes" />
          </div>
          <div className="flex-1 flex flex-col justify-start mt-10">
            {results.map((result) => (
              <Link
                className="px-5"
                key={result.id}
                href={`/recipes/${result.name
                  .replace(/\s+/g, "-")
                  .toLowerCase()}/${result.id}`}
              >
                <p className="text-base py-4  hover:text-orange-500">
                  {result.name}
                </p>
                <div className="flex flex-row justify-center">
                  <hr className="flex border-gray-200 w-full"></hr>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
      {isResults === false && (
        <div className="results-container z-10 flex flex-col left-1/2 -translate-x-1/2 bg-white shadow-md absolute">
          <h2 className="text-lg font-bold mb-2">No recipes found</h2>
        </div>
      )}
    </div>
  );
}
