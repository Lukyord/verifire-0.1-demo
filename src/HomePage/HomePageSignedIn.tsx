import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../../store/authStore";

export default function HomePageSignedIn() {
  const router = useRouter();
  const { displayName } = useAuthStore();

  return (
    <>
      <h1>Welcome...</h1>
      <h1>{displayName}</h1>
      <div className="grid grid-cols-2 grid-rows-4 gap-4 m-4 h-full">
        <div
          className="bg-blue-500 p-4 row-span-2 col-span-2 cursor-pointer"
          onClick={() => router.push("/about")}
        >
          About
        </div>
        <div
          className="bg-yellow-500 p-4 cursor-pointer"
          onClick={() => router.push("lets_meet")}
        >
          Let's Meet
        </div>
        <div
          className="bg-yellow-500 p-4 row-span-2 cursor-pointer"
          onClick={() => router.push("/friends")}
        >
          Friends
        </div>
        <div
          className="bg-red-500 p-4 cursor-pointer"
          onClick={() => router.push("/history_meet")}
        >
          History Meet
        </div>
      </div>
    </>
  );
}
