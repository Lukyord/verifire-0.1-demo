"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { navLinks } from "../../constants";
import useModalShownStore from "../../store/store";
import NavLinkMobile from "../Header/components/NavLinkMobile";

export default function MobileNavBar() {
  const { setModalShown, modalShown } = useModalShownStore();

  const handleClick = () => {
    setModalShown(!modalShown);
    // console.log(useModalShownStore.getState().modalShown);
  };

  return (
    <div
      className={`absolute bg-slate-100 h-full w-screen
      ${modalShown ? "visible" : "invisible"}
      `}
    >
      <div className="flex flex-col">
        <div className="w-full h-36 flex justify-end">
          <ArrowRightCircleIcon
            onClick={handleClick}
            className="w-20 h-20 cursor-pointer m-8 "
            color="black"
          />
        </div>
        <div className="flex flex-col pr-4">
          {navLinks.map((navlink) => (
            <NavLinkMobile key={navlink} navlink={navlink} />
          ))}
        </div>
      </div>
    </div>
  );
}
