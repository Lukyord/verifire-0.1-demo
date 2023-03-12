"use client";

import { useRouter } from "next/navigation";
import useModalShownStore from "../../../store/store";

type Props = {
  navlink: string;
};

export default function Navlink({ navlink }: Props) {
  const router = useRouter();
  const { toggle } = useModalShownStore();

  const handleSubmit = () => {
    if (navlink != "Home/About") {
      if (navlink === "Let's Meet") {
        router.push("/lets_meet");
      } else {
        router.push(`/${navlink.toLowerCase().replace(/ /g, "_")}`);
      }
    } else {
      router.replace("/");
    }

    toggle();
  };

  return (
    <button
      onClick={handleSubmit}
      className="text-black text-2xl font-semibold text-left pl-16"
    >
      {navlink}
    </button>
  );
}
