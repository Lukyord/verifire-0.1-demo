"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { navLinks, navLinksLoggedIn } from "../../constants";
import useAuthStore from "../../store/authStore";
import Hamgberger from "./components/Hamgberger";
import Navlink from "./components/Navlink";
import LogoText from "../../public/logo/logo_text.png";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <div className="h-20 md:h-24 w-full bg-transparent flex items-center justify-between p-2 px-4">
      {/* <h1
        onClick={() => router.replace("/")}
        className="text-4xl md:text-6xl font-bold my-auto cursor-pointer"
      >
        VeriFire
      </h1> */}
      <Image
        src={LogoText}
        alt="VeriFire"
        width={150}
        height={75}
        className="ml-2"
      />
      <div>
        <div className="md:hidden">
          <Hamgberger />
        </div>
        <div className="hidden md:block mt-6">
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
