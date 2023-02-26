"use client";

import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { navLinks } from "../../constants";
import useModalShownStore from "../../store/store";
import NavLinkMobile from "../Header/components/NavLinkMobile";
import styles from "../../styles/MobileNavBar.module.css";

export default function MobileNavBar() {
  const { setModalShown, modalShown } = useModalShownStore();

  const handleClick = () => {
    setModalShown(!modalShown);
    // console.log(useModalShownStore.getState().modalShown);
  };

  return (
    <div
      className={`fixed z-20 bg-slate-100 h-full
      ${modalShown ? styles.MobileNavBarShown : styles.MobileNavBarNotShown}
      whitespace-nowrap ease-in duration-300 w-screen xs:hidden
      `}
    >
      <div
        className={`flex flex-col w-full ${
          modalShown ? "visible" : "invisible"
        } space-y-14 `}
      >
        <div className="h-36 flex ml-8">
          <ArrowRightCircleIcon
            onClick={handleClick}
            className="w-20 h-20 cursor-pointer mt-8"
            color="black"
          />
        </div>
        {navLinks.map((navlink) => (
          <NavLinkMobile key={navlink} navlink={navlink} />
        ))}
      </div>
    </div>
  );
}
