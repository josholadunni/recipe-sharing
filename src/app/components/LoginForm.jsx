"use client";

import React from "react";
import Input from "../components/Input.jsx";
// import { useActionState } from "react";
import { authenticate } from "../lib/actions.js";
import { useRouter } from "next/navigation.js";
import { useFormState } from "react-dom";
import { signIn } from "next-auth/react";

export default function LoginForm() {
  const [state, formAction] = useFormState(authenticate, {
    success: false,
    message: "",
  });

  const router = useRouter();

  React.useEffect(() => {
    if (state?.success) {
      console.log("Client: Success, preparing to redirect");
      location.reload();
      router.push("/dashboard");
    }
  }, [state, router]);

  return (
    <div className="flex flex-col space-y-4">
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
          <button className="mx-auto block border-solid border-black border-2">
            Log In with Email
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

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-2 text-gray-500">Or continue with</span>
        </div>
      </div>

      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="flex items-center justify-center gap-2 rounded-lg bg-white p-2 text-sm font-medium hover:bg-gray-50 border border-gray-300"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Sign in with Google
      </button>
    </div>
  );
}
