import React from "react";

function H1(props) {
  return (
    <h1
      style={{ fontWeight: 900 }}
      className={`text-center text-3xl font-medium pb-3 mt-5 ${props.color}`}
    >
      {props.text}
    </h1>
  );
}

export default H1;
