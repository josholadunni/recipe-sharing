"use client";

import Link from "next/link";
import LogInOutBtn from "../components/LogInOutBtn.jsx";
import SearchBar from "../components/SearchBar.jsx";
import React, { useState } from "react";
import SignUpBtn from "./SignUpBtn.jsx";
import { useAuth } from "../context/AuthContext";
import navStyles from "./Navbar.module.css";
import MenuItem from "../components/MenuItem.jsx";
import MenuItemMobile from "./MenuItemMobile.jsx";

function Navbar() {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <nav className={`${navStyles.navbar} pt-5 text-sm flex justify-center`}>
        <ul className="text-center py-5 gap-4 md:gap-1 flex flex-wrap flex-row justify-center items-center w-full">
          <li className="basis-1/6 md:basis-1/6 m-0">
            <Link href="/">Home</Link>
          </li>
          <li className="hidden md:block basis-1/6 m-0">
            <Link href="/browse">Browse</Link>
          </li>
          <li className="basis-3/6 md:basis-1/6 m-0">
            <SearchBar placeholder="Search Recipes" />
          </li>
          <li className="hidden md:block basis-1/6 m-0">
            <Link href="/add-recipe">Add Recipe</Link>
          </li>
          <li
            onClick={() => {
              toggleMenu();
            }}
            className="relative basis-1/6 md:basis-1/6 m-0"
          >
            <div className="relative">
              <div className="rotate-90">
                <span className="m-1 border border-sky-300"></span>
                <span className="m-1 border border-sky-300"></span>
                <span className="m-1 border border-sky-300"></span>
              </div>
              {isMenuOpen && (
                <ul className="flex flex-col fixed top-[90px] left-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full bg-white shadow-md rounded-md p-2 w-screen md:w-auto md:min-w-[150px] z-[100]">
                  {isAuthenticated && (
                    <MenuItem route="/dashboard" routeName="Dashboard" />
                  )}
                  <MenuItemMobile route="/browse" routeName="Browse" />
                  <MenuItemMobile route="/add-recipe" routeName="Add Recipe" />
                  <li
                    className={`${navStyles.navLink} flex justify-center md:mx-5`}
                  >
                    <LogInOutBtn isLoggedIn={isAuthenticated} />
                  </li>
                  {!isAuthenticated && (
                    <li className={`${navStyles.navLink} md:mx-5`}>
                      <SignUpBtn />
                    </li>
                  )}
                </ul>
              )}
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
