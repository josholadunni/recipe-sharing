"use client";

import React from "react";
import Input from "../components/Input.jsx";
import { useActionState } from "react";
import { authenticate } from "../lib/actions.js";
import { useRouter } from "next/navigation.js";

export default function LoginForm() {
  const [state, formAction] = useActionState(authenticate, {
    success: false,
    message: "",
  });
  const router = useRouter();

  console.log("Render - state: " + state);

  React.useEffect(() => {
    if (state?.success) {
      console.log("Client: Success, preparing to redirect");
      setTimeout(() => {
        console.log("Client: Redirecting to dashbaord");
        router.push("/dashboard");
      }, 2000);
    }
  }, [state, router]);
  return (
    <div>
      <form action={formAction} className="space-y-3">
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
          <div
            className="flex h-8 items-end space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {state?.message && (
              <p
                className={`text-sm ${
                  state.success ? "text-green-500" : "text-red-500"
                }`}
              >
                {state.message}
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
