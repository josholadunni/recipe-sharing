"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className=" bg-white text-black border border-black rounded hover:bg-black hover:text-white p-1 mt-12"
      type="submit"
      aria-disabled={pending}
    >
      {pending ? "Uploading..." : "Upload Recipe"}
    </button>
  );
}
