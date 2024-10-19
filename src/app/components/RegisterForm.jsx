"use client";

import React from "react";
import Input from "./Input.jsx";
import { createUser } from "../lib/actions.js";
import { useFormState } from "react-dom";
import { useRouter } from "next/navigation.js";

export default function RegisterForm() {
  const router = useRouter();
  const [state, formAction] = useFormState(createUser, {
    success: false,
    errors: {},
  });

  const renderErrors = (errors) => {
    if (!errors || Object.keys(errors).length === 0) return null;
    return (
      <ul>
        {Object.entries(errors).map(([field, message]) => (
          <li key={field} className="text-red-500">
            {message}
          </li>
        ))}
      </ul>
    );
  };

  state?.success && router.push("/");

  return (
    <div>
      <form action={formAction}>
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
          <p>{state?.errors && renderErrors(state.errors)}</p>
          <p>{state?.success && state.message}</p>
        </div>
      </form>
    </div>
  );
}
