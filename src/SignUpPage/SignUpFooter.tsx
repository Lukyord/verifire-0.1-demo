"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function SignUpFooter() {
  const router = useRouter();
  return (
    <p className="text-center text-sm">
      Have an account?{" "}
      <span
        className="text-white cursor-pointer underline hover:text-purple-200"
        onClick={() => router.push(`/sign_in`)}
      >
        Sign In
      </span>
    </p>
  );
}
