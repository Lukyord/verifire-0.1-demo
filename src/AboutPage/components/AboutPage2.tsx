"use client";

import Link from "next/link";
import useAuthStore from "../../../store/authStore";

export default function AboutPage2() {
  const { user } = useAuthStore();
  return (
    <>
      <div></div>
      <div className="text-start text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col gap-2">
        <h1 className="font-helvetica_outline tracking-tight">Have fun,</h1>
        <h1 className="tracking-tight">Stay safe!</h1>
      </div>
      {user ? (
        <div></div>
      ) : (
        <div className="flex flex-col text-lg gap-4">
          <Link href="/sign_in">
            <button className="px-16 py-1 bg-purple-300 border-2 border-purple-300 rounded-2xl hover:bg-white hover:text-purple-600">
              Sign in
            </button>
          </Link>
          <Link href="sign_up">
            <button className="text-white underline hover:text-black">
              Sign up
            </button>
          </Link>
        </div>
      )}
    </>
  );
}
