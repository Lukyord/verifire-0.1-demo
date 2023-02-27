"use client";

import { useRouter } from "next/navigation";
import React from "react";
import useAuthStore from "../../store/authStore";

export default function page() {
  const { signout, user } = useAuthStore();
  const router = useRouter();

  async function submitHandler() {
    await signout();
    router.push("/");
  }
  return (
    <div>
      <button onClick={submitHandler}>sign out</button>
    </div>
  );
}
