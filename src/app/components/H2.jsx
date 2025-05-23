import React from "react";

function H2(props) {
  return (
    <h2
      style={{ fontWeight: 600 }}
      className={`text-xl my-4 ${props.color} ${props.className}`}
    >
      {props.text}
    </h2>
  );
}

export default H2;
