import React from "react";
import { Heading } from "../lib/types/Style";

function H3(props: Heading) {
  return <h3 className="font-bold">{props.text}</h3>;
}

export default H3;
