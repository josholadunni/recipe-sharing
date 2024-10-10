"use client";

export function SubmitButton(props) {
  console.log(isValidated);

  return (
    <div>
      <button
        id="submitBtn"
        onClick={(e) => {
          handleClick(e);
        }}
        className=" bg-white text-black border border-black rounded hover:bg-black hover:text-white p-1 mt-12"
        type="submit"
        aria-disabled={pending || isValidated}
      >
        {pending ? "Uploading..." : "Upload Recipe"}
      </button>
      <p>{errorMessage}</p>
    </div>
  );
}
