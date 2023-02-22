"use client";

import { useRouter } from "next/navigation";
import Hamgberger from "./components/Hamgberger";
import NavLinks from "./components/NavLinks";

export default function Header() {
  const router = useRouter();

  return (
    <div className="h-20 md:h-24 w-full bg-purple-700 flex items-center justify-between p-2 px-4 shadow-2xl">
      <h1
        onClick={() => router.replace("/")}
        className="text-white text-4xl md:text-6xl font-bold my-auto cursor-pointer"
      >
        VeriFire
      </h1>
      <div>
        <div className="md:hidden">
          <Hamgberger />
        </div>
        <div className="hidden md:block">
          <NavLinks />
        </div>
      </div>
    </div>
  );
}
