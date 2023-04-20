"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { navLinks, navLinksLoggedIn } from "../../constants";
import useAuthStore from "../../store/authStore";
import Hamgberger from "./components/Hamgberger";
import Navlink from "./components/Navlink";
import LogoText from "../../public/logo/logo_text.png";
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <div className="h-20 md:h-24 w-full bg-transparent flex items-center justify-between p-2 px-4">
      <Link href={"/"}>
        <Image
          src={LogoText}
          alt="VeriFire"
          width={120}
          height={120}
          className="m-2 w-auto"
          priority
        />
      </Link>
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
