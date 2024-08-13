import React from "react";

export default function Input(props) {
  return (
    <div id={props.id} className="py-2 flex flex-col w-60 mx-auto">
      <label htmlFor={props.name}>{props.label}</label>
      <br></br>
      <div className="flex flex-row">
        <input
          className="border-2"
          type={props.type}
          name={props.name}
          placeholder={props.placeholder}
          onChange={props.onChange}
          required
        />
        <span
          className=" text-black border border-black rounded hover:bg-black hover:text-white px-2"
          onClick={() => props.onRemove()}
        >
          x
        </span>
      </div>
    </div>
  );
}
