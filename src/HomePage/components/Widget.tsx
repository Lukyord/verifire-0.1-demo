import { useRouter } from "next/navigation";
import React from "react";

export default function Widget() {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 grid-rows-4 gap-4 m-4 mt-2 h-[40rem] md:h-[29.5rem]">
      <div
        className="bg-purple-700 p-4 row-span-2 col-span-2 cursor-pointer rounded-3xl bg-opacity-60 flex flex-col justify-end"
        onClick={() => router.push("/about")}
      >
        <h1 className="font-helvetica_outline text-white text-4xl ">About</h1>
      </div>
      <div
        className="bg-purple-700 p-4 cursor-pointer rounded-3xl bg-opacity-30 flex flex-col justify-end"
        onClick={() => router.push("/lets_meet")}
      >
        <div className="text-xl font-semibold">
          <h1>Let's</h1>
          <h1>Meet</h1>
        </div>
      </div>
      <div
        className="bg-purple-300 p-4 row-span-2 cursor-pointer rounded-3xl bg-opacity-60 flex flex-col justify-end"
        onClick={() => router.push("/friends")}
      >
        <h1 className="text-xl text-white">Friends</h1>
      </div>
      <div
        className="bg-gray-700 p-4 cursor-pointer rounded-3xl bg-opacity-60 flex flex-col justify-end"
        onClick={() => router.push("/history_meet")}
      >
        <div className="text-xl text-white">
          <h1>History</h1>
          <h1>Meet</h1>
        </div>
      </div>
    </div>
  );
}
