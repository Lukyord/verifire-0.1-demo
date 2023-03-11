"use client";

import React, { useEffect } from "react";
import useModalShownStore from "../../../store/store";

export default function Overlay() {
  const { toggle, modalShown, setModalShown } = useModalShownStore();
  // console.log(useModalShownStore.getState().modalShown);
  useEffect(() => {
    setModalShown();
  }, []);

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
