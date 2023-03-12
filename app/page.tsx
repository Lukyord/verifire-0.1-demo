"use client";

import React, { useEffect } from "react";
import HomePageSignedIn from "../src/HomePage/HomePageSignedIn";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user } = useAuthStore();

  return (
    <>
      {user ? (
        <HomePageSignedIn />
      ) : (
        <div className="">
          <p>Welcome guest</p>
        </div>
      )}
    </>
  );
}
