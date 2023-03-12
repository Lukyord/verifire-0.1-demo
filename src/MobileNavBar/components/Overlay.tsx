"use client";

import React, { useEffect } from "react";
import useModalShownStore from "../../../store/store";

export default function Overlay() {
  const { toggle, modalShown } = useModalShownStore();
  // console.log(useModalShownStore.getState().modalShown);

  return (
    <div
      className={`absolute z-10 bg-gray-900 opacity-50 h-screen w-screen ${
        modalShown ? "visible" : "invisible"
      }`}
      onClick={() => {
        toggle();
        console.log("ja");
      }}
    ></div>
  );
}
