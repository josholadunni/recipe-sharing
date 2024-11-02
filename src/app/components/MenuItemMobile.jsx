import React from "react";
import Link from "next/link";
import navStyles from "./Navbar.module.css";

export default function MenuItemMobile(props) {
  const { route, routeName } = props;
  return (
    <li className={`${navStyles.navLink} block md:hidden`}>
      <Link href={route}>{routeName}</Link>
    </li>
  );
}
