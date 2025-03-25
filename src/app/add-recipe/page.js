import React from "react";
import Form from "../components/Form.jsx";
import H1 from "../components/H1.jsx";

export default async function AddRecipes() {
  return (
    <div className="flex justify-center">
      <div className="bg-white w-fit min-h-[600px] mt-24 rounded-t-2xl shadow-md px-32 py-4 relative">
        <H1 text="Add Recipe" className="text-center" />
        <Form />
      </div>
    </div>
  );
}
