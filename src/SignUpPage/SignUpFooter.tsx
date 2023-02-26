"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Footer() {
  const router = useRouter();
  return (
    <p className="text-center text-gray-400 ">
      Have an account?{" "}
      <span
        className="text-blue-700 cursor-pointer"
        onClick={() => router.push(`/login`)}
      >
        Sign In
      </span>
    </p>
  );
}
