"use client";

import React, { useState } from "react";
import Input from "./Input.jsx";
import { createUser } from "../lib/actions.js";

export default function RegisterForm() {
  const [message, setMessage] = useState("");
  const handleSubmit = async (formData) => {
    const result = await createUser(formData);

    if (result.success) {
      setMessage(result.message);
    } else {
      setMessage(result.message);
    }
  };
  return (
    <div>
      <form action={handleSubmit}>
        <div>
          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="Enter username here"
          />
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email here"
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
          />
          <Input
            label="Confirm Password"
            name="confirm-password"
            type="password"
            placeholder="Confirm password"
          />
          <button className="mx-auto block border-solid border-black border-2 ">
            Sign Up
          </button>
        </div>
      </form>
      {message && (
        <div
          className={`mt-4 p-2 ${
            message.includes("successfully")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
