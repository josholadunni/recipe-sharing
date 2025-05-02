import React from "react";
import { Heading } from "../lib/types/Style";

function H2(props: Heading) {
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
