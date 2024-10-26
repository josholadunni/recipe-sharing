"use client";

import Link from "next/link";
import LogInOutBtn from "../components/LogInOutBtn.jsx";
import SearchBar from "../components/SearchBar.jsx";
import React from "react";
import SignUpBtn from "./SignUpBtn.jsx";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <nav className="pt-5">
        <ul className="text-center">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/browse">Browse</Link>
          </li>
          <li>
            <SearchBar placeholder="Search Recipes" />
          </li>
          <li>
            <Link href="/add-recipe">Add Recipe</Link>
          </li>
          <li>
            <LogInOutBtn isLoggedIn={isAuthenticated} />
          </li>
          {!isAuthenticated && (
            <li>
              <SignUpBtn />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
