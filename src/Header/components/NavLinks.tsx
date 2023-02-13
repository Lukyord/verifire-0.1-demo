import React from "react";
import { navLinks } from "../../../constants";

export default function NavLinks() {
  return (
    <div className="flex flex-row items-center justify-between space-x-10 pr-8">
      {navLinks.map((navlink) => (
        <p className="text-white font-semibold">{navlink}</p>
      ))}
    </div>
  );
}
