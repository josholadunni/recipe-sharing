import React from "react";

export default function Input(props) {
  return (
    <div className="py-2 flex flex-col w-60 mx-auto">
      <label htmlFor={props.name}>{props.label}</label>
      <br></br>
      <input
        className="border-2"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        required
      />
    </div>
  );
}
