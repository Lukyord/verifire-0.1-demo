"use client";

import React from "react";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user } = useAuthStore();
  return (
    <>
      {user ? (
        <div className="h-full w-full">
          <p className="text-red-500">Logged In</p>
        </div>
      ) : (
        <div className="h-full w-full ">
          <p className="text-red-500">Welcome guest</p>
        </div>
      )}
    </>
  );
}
