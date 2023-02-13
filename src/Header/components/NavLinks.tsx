import React from "react";
import { navLinks } from "../../../constants";

export default function NavLinks() {
  return (
    <div className="flex flex-row items-center justify-between space-x-10">
      {navLinks.map((navlink) => (
        <p>{navlink}</p>
      ))}
    </div>
  );
}
