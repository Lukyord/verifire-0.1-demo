"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Footer() {
  const router = useRouter();
  return (
    <div>
      <div className="text-center text-gray-400 ">
        Have an account?{" "}
        <p
          className="text-blue-700 cursor-pointer"
          onClick={() => router.push(`/login`)}
        >
          Sign In
        </p>
      </div>
    </div>
  );
}
