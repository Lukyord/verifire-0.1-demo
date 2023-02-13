"use client";

import Hamgburger from "./components/Hamgburger";
import NavLinks from "./components/NavLinks";

export default function Header() {
  return (
    <div className="h-20 md:h-24 w-full bg-purple-700 flex items-center justify-between p-2 px-4 shadow-2xl">
      <h1 className="text-white text-4xl md:text-6xl font-bold my-auto cursor-pointer">
        VeriFire
      </h1>
      <div>
        <div className="md:hidden">
          <Hamgburger />
        </div>
        <div className="hidden md:block">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
