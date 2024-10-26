"use client";
import React from "react";

function DeleteButton(props) {
  const { deleteFunction: deleteUser, currentUserId } = props;
  return (
    <button
      onClick={() => {
        deleteUser(currentUserId);
      }}
      className="border-2 border-rose-500 bg-rose-500"
    >
      Delete Recipes
    </button>
  );
}

export default DeleteButton;
