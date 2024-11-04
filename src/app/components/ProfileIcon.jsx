import React from "react";
import Link from "next/link";

export default function ProfileIcon(props) {
  const { name } = props;
  return (
    <span className="m-1 rounded-full bg-orange-500 w-10 h-10 flex flex-col align-center justify-center text-slate-50">
      {name?.slice(0, 1).toUpperCase()}
    </span>
  );
}
