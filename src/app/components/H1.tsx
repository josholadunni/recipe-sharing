import React from "react";
import { Heading } from "../lib/types/Style";

function H1(props: Heading) {
  return (
    <h1
      style={{ fontWeight: 900 }}
      className={`text-3xl font-medium pb-3 mt-5 ${props.color} ${props.className}`}
    >
      {props.text}
    </h1>
  );
}

export default H1;
