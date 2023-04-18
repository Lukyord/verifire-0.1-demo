"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function Footer() {
  const router = useRouter();
  return (
    <div>
      <p className="text-center text-sm">
        Don't have an account?{" "}
        <span
          className="text-white cursor-pointer underline hover:text-purple-200"
          onClick={() => router.push(`/sign_up`)}
        >
          Sign Up Here
        </span>
      </p>
    </div>
  );
}
