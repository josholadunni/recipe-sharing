"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { search } from "../lib/actions";
import Link from "next/link";
import searchStyles from "./SearchBar.module.css";
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
      }, 1000);

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
          className={`${searchStyles.searchInput} p-2 w-full`}
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
        <div className="results-container z-10 flex flex-col left-1/2 -translate-x-1/2 bg-white shadow-md absolute">
          <h2 className="text-lg font-bold mb-2">Searching...</h2>
        </div>
      )}
      {results.length > 0 && (
        <div className="results-container z-10 flex flex-col left-1/2 -translate-x-1/2 bg-white shadow-md absolute">
          {results.map((result) => (
            <Link
              className="px-5 py-4"
              key={result.id}
              href={`/recipes/${result.name
                .replace(/\s+/g, "-")
                .toLowerCase()}/${result.id}`}
            >
              <h2 className="text-lg font-bold mb-2">{result.name}</h2>
            </Link>
          ))}
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
