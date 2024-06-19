import React from "react";
import Input from "../components/Input.jsx";

export default function LoginForm() {
  return (
    <div>
      <h1 className="text-center text-3xl font-medium pb-3 mt-5">Log In</h1>
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
