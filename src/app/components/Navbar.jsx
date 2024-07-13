"use client";

import Link from "next/link";
import { logOut } from "@/app/lib/actions";
import { useRouter } from "next/navigation.js";
import { useFormState } from "react-dom";
import React from "react";

function Navbar() {
  const router = useRouter();
  const [state, formAction] = useFormState(logOut, { isLoggedOut: false });
  console.log("Initial state:", { ...state });

  React.useEffect(() => {
    console.log("Render - state: " + state);
    if (state?.isLoggedOut) {
      console.log("Client: Success, preparing to redirect");
      console.log("Client: Redirecting to home");
      router.push("/");
    }
  }, [state, router]);

  return (
    <div>
      <nav className="pt-5">
        <ul className="text-center">
          <Link href="/">Home</Link>
          <li>Browse</li>
          <li>Search</li>
          <Link href="/add-recipe">Add Recipe</Link>
          <li>Login</li>
          <li>
            {" "}
            <form action={formAction}>
              <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
                <div className="hidden md:block">Sign Out</div>
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
