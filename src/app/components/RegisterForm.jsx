import React from "react";
import Input from "./Input.jsx";
import { createUser } from "../lib/actions.js";

export default function RegisterForm() {
  return (
    <div>
      <form action={createUser}>
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
    </div>
  );
}
