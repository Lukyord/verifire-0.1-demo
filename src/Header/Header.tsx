"use client";

import { useRouter } from "next/navigation";
import { navLinks, navLinksLoggedIn } from "../../constants";
import useAuthStore from "../../store/authStore";
import Hamgberger from "./components/Hamgberger";
import Navlink from "./components/Navlink";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();

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
          {user ? (
            <div className="flex flex-row items-center justify-between space-x-10 pr-8">
              {navLinksLoggedIn.map((navlink) => (
                <Navlink key={navlink} navlink={navlink} />
              ))}
            </div>
          ) : (
            <div className="flex flex-row items-center justify-between space-x-10 pr-8">
              {navLinks.map((navlink) => (
                <Navlink key={navlink} navlink={navlink} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
