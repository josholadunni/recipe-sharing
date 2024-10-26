"use client";
import React from "react";
import { deleteUser } from "../lib/actions";

function DeleteButton({ currentUserId }) {
  const handleDeleteUser = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This can't be undone."
      )
    ) {
      const result = await deleteUser(currentUserId);
      if (result.success) {
        console.log(result.message);
      } else {
        console.error(result.message);
      }
    }
  };

  return (
    <button
      onClick={handleDeleteUser}
      className="border-2 border-rose-500 bg-rose-500"
    >
      Delete Account
    </button>
  );
}

export default DeleteButton;
