"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import { navLinks, navLinksLoggedIn } from "../../constants";
import useModalShownStore from "../../store/store";
import NavLinkMobile from "../Header/components/NavLinkMobile";
import styles from "../../styles/MobileNavBar.module.css";
import useAuthStore from "../../store/authStore";
import { useEffect } from "react";

export default function MobileNavBar() {
  const { toggle, modalShown, setModalShown } = useModalShownStore();
  const { user } = useAuthStore();

  // console.log(useModalShownStore.getState().modalShown);

  useEffect(() => {
    setModalShown();
  }, []);

  return (
    <div
      className={`fixed z-20 bg-slate-100 h-full
      ${modalShown ? styles.MobileNavBarShown : styles.MobileNavBarNotShown}
      whitespace-nowrap ease-in duration-300 w-screen xs:invisible
      `}
    >
      <div
        className={`flex flex-col w-full ${
          modalShown ? "visible" : "invisible"
        } space-y-14 `}
      >
        <div className="h-36 flex ml-8">
          <ArrowRightCircleIcon
            onClick={toggle}
            className="w-20 h-20 cursor-pointer mt-8"
            color="black"
          />
        </div>
        {user ? (
          <>
            {navLinksLoggedIn.map((navlink) => (
              <NavLinkMobile key={navlink} navlink={navlink} />
            ))}
          </>
        ) : (
          <>
            {navLinks.map((navlink) => (
              <NavLinkMobile key={navlink} navlink={navlink} />
            ))}
          </>
        )}
        {/* <>
        {navLinks.map((navlink) => (
          <NavLinkMobile key={navlink} navlink={navlink} />
        ))}
        </> */}
      </div>
    </div>
  );
}
