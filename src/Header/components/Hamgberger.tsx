"use client";

import { Bars3Icon } from "@heroicons/react/24/solid";
import { useState } from "react";

export default function Hamgberger() {
  const [hamberger, setHamberger] = useState(false);

  return (
    <div onClick={() => setHamberger(!hamberger)}>
      <Bars3Icon className="w-8 h-8 cursor-pointer" color="white" />
    </div>
  );
}
