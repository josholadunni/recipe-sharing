"use client";

import { useContext } from "react";
import { AuthContext } from "./Auth";

function Navbar() {
  const { isLoggedIn } = useContext(AuthContext);
  const { setIsLoggedIn } = useContext(AuthContext);
  return (
    <nav>
      <ul>
        <li>Home</li>
        <li>Browse</li>
        <li>Search</li>
        <li>
          {isLoggedIn ? (
            <button
              onClick={() => {
                setIsLoggedIn(false);
              }}
            >
              Logout
            </button>
          ) : (
            "Login"
          )}
        </li>
        <li>Account</li>
      </ul>
    </nav>
  );
}

export default Navbar;
