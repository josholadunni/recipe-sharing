"use client";

import React from "react";
import Input from "../components/Input.jsx";

export default function LoginForm() {
  return (
    <div>
      <form>
        <div>
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
          <button className="mx-auto block border-solid border-black border-2 ">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
