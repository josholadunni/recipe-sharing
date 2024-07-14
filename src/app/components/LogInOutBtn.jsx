"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useFormState } from "react-dom";
import { logOut } from "../lib/actions";
import { useRouter } from "next/navigation.js";

export default function LogInOutBtn() {
  console.log("Rendering log in out btn");
  const { data: session, status } = useSession();
  const [state, formAction] = useFormState(logOut, { isLoggedOut: false });
  const router = useRouter();
  const { update } = useSession();

  const [authStatus, setAuthStatus] = useState(null);

  useEffect(() => {
    if (state?.isLoggedOut) {
      router.push("/");
    }
  }, [state, router]);

  useEffect(() => {
    if (status === "unauthenticated") {
      console.log("STATUS IS UNAUTH");
      setAuthStatus(<Link href="/login">Login</Link>);
    } else if (status === "authenticated") {
      console.log("STATUS IS AUTH");
      setAuthStatus(
        <form action={formAction}>
          <button
            onClick={() => update()}
            type="submit"
            className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      );
    } else {
      setAuthStatus(<p>Loading</p>);
    }
  }, [status, session]);

  return authStatus;
}
