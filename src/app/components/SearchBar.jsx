"use client";
import React, { useState, useEffect } from "react";
import { search } from "../lib/actions";
import Link from "next/link";
export default function SearchBar({ placeholder }) {
  const [timeoutId, setTimeoutId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      setIsLoading(true);
      const newTimeoutId = setTimeout(async () => {
        try {
          const response = await search(searchTerm);
          response && setIsLoading(false);
          setResults(response);
          console.log(results);
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
    setSearchTerm(term);
  }

  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          const term = e.target.value;
          handleInputChange(term);
        }}
      />
      {isLoading && <p>Searching...</p>}
      {results.length > 0 && (
        <div className="results-container">
          {results.map((result) => (
            <Link
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
    </div>
  );
}
