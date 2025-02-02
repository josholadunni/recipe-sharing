"use client";

import Link from "next/link";
import LogInOutBtn from "../components/LogInOutBtn.jsx";
import SearchBar from "../components/SearchBar.jsx";
import React, { useState, useEffect } from "react";
import SignUpBtn from "./SignUpBtn.jsx";
import { useAuth } from "../context/AuthContext";
import navStyles from "./Navbar.module.css";
import MenuItem from "../components/MenuItem.jsx";
import MenuItemMobile from "./MenuItemMobile.jsx";
import ProfileIcon from "./ProfileIcon.jsx";
import H1 from "./H1.jsx";

function Navbar({ username }) {
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [results, setResults] = useState([]);
  const [isScrolledUp, setIsScrolledUp] = useState(true);

  let lastScrollTop = 0;

  useEffect(() => {
    const handleScroll = () => {
      var st = window.pageYOffset || document.documentElement.scrollTop;
      if (st > lastScrollTop) {
        setIsScrolledUp(false);
      } else if (st < lastScrollTop) {
        setIsScrolledUp(true);
      } else {
        console.log();
      }
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav
      className={`${navStyles.navbar} flex flex-col text-sm justify-center sticky top-0 z-10 border-b-[1.5px] border-b-[#E4E4E7] bg-[#F9F9F9]`}
      onMouseLeave={() => {
        setResults([]);
      }}
    >
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row text-recipe-red hover:text-red-500 basis-3/12 m-0 ">
            <H1 text="Recipe Sharer" />
          </div>
          <ul className="text-center py-2 gap-4 md:gap-14 lg:gap-24 flex flex-row justify-end flex-wrap basis-9/12 items-center">
            <li className="hover:text-orange-500 hidden md:block m-0">
              <Link href="/browse">Browse</Link>
            </li>
            <li className="hover:text-orange-500 hidden md:block m-0">
              <Link href="/add-recipe">Add Recipe</Link>
            </li>
            {!isAuthenticated && (
              <ul className="hidden md:flex flex-row justify-center">
                <li className={`flex justify-center md:mx-5 my-auto`}>
                  <LogInOutBtn isLoggedIn={isAuthenticated} />
                </li>
                <li className={`${navStyles.navLink} md:mx-5 my-auto`}>
                  <SignUpBtn />
                </li>
              </ul>
            )}
            <li
              onClick={() => {
                toggleMenu();
              }}
              className="relative m-0"
            >
              <div className="relative">
                <div className="md:hidden rotate-90">
                  <span className="m-1 border border-neutral-900"></span>
                  <span className="m-1 border border-neutral-900"></span>
                  <span className="m-1 border border-neutral-900"></span>
                </div>
                {isAuthenticated && (
                  <div className="hidden md:block">
                    <ProfileIcon name={username} />
                  </div>
                )}

                {/* Hamburger menu open */}
                {isMenuOpen && (
                  <ul className="flex flex-col fixed top-[50px] left-0 md:absolute md:left-1/2 md:-translate-x-1/2 md:top-full bg-white shadow-md rounded-md p-2 w-screen md:w-auto md:min-w-[150px] z-[100]">
                    <div className="hover:text-orange-500">
                      <MenuItemMobile route="/browse" routeName="Browse" />
                    </div>
                    <div className="hover:text-orange-500">
                      <MenuItemMobile
                        route="/add-recipe"
                        routeName="Add Recipe"
                      />
                    </div>
                    <div className="mt-3">
                      {isAuthenticated && (
                        <>
                          <div className="md:hidden flex flex-row justify-center">
                            <ProfileIcon name={username} />
                          </div>
                          <div className="hover:text-orange-500">
                            <MenuItem
                              route="/dashboard"
                              routeName="Dashboard"
                            />
                          </div>
                        </>
                      )}
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
                    </div>
                  </ul>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div
        className={`flex-row w-full overflow-hidden transition-all duration-500 ease-in-out ${
          isScrolledUp ? "pb-4" : "pb-2"
        } ${isScrolledUp ? "opacity-100 max-h-20" : "opacity-0 max-h-0"}`}
      >
        <SearchBar
          setResults={setResults}
          results={results}
          placeholder="Search Recipes"
        />
      </div>
    </nav>
  );
}

export default Navbar;
