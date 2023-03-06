"use client";

import React, { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user } = useAuthStore();

  return (
    <>
      {user ? (
        <div className="">
          <p>Logged In</p>
        </div>
      ) : (
        <div className=" ">
          <p>Welcome guest</p>
        </div>
      )}
    </>
  );
}
