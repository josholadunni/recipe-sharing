"use client";

import Link from "next/link";
import LogInOutBtn from "../components/LogInOutBtn.jsx";
import React from "react";
import { useSession } from "next-auth/react";

function Navbar() {
  const { data: session, status } = useSession();
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
            <Link href="/search">Search</Link>
          </li>
          <li>
            <Link href="/add-recipe">Add Recipe</Link>
          </li>
          <li>
            <LogInOutBtn />
          </li>
          <li>
            <button
              onClick={() => {
                console.log(status);
              }}
            >
              Show session
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
