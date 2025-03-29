import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SignUpBtn() {
  const { data: session, status } = useSession();

  if (!session) {
    return (
      <Link
        href="/register"
        className="flex items-center justify-center gap-2 rounded-md text-white bg-recipe-red p-3 text-sm font-medium hover:bg-red-700 hover:text-red-white whitespace-pre"
      >
        Sign Up
      </Link>
    );
  }
}
