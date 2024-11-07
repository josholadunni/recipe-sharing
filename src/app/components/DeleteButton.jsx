"use client";
import React from "react";
import { deleteUser } from "../lib/actions";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

function DeleteButton({ currentUserId }) {
  const router = useRouter();

  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This can't be undone."
      )
    ) {
      const result = await deleteUser(currentUserId);
      if (result.success) {
        await signOut({ redirect: false });
        router.push("/");
      } else {
        console.error(result.message);
      }
    }
  };

  return (
    <button onClick={handleDeleteUser} className="text-rose-500">
      Delete Account
    </button>
  );
}

export default DeleteButton;
