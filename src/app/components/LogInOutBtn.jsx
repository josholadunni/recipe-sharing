import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";

export default function LogInOutBtn(props) {
  const { data: session, status } = useSession();
  const { isLoggedIn } = props;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (isLoggedIn) {
    return (
      <button
        onClick={() => signOut()}
        className="flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-500 hover:text-white"
      >
        Sign Out
      </button>
    );
  }

  return (
    <button
      onClick={() => signIn()}
      className="flex items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-red-700 hover:text-white whitespace-pre"
    >
      Sign In
    </button>
  );
}
