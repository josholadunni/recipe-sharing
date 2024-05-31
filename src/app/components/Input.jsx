import React from "react";

export default function Input(props) {
  return (
    <div class="py-2 flex flex-col w-60 mx-auto">
      <label for={props.name}>{props.label}</label>
      <br></br>
      <input
        class="border-2"
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
      />
    </div>
  );
}
