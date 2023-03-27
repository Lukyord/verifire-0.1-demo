"use client";

import React, { useEffect } from "react";
import HomePageSignedIn from "../src/HomePage/HomePageSignedIn";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user } = useAuthStore();

  return (
    <>
      {user ? (
        <>
          <HomePageSignedIn />
          {/* <div className="mt-10">
            <h1>Your feedback is valuable to VeriFire</h1>
            <p>
              Help us create a better and safer dating platform for everyone by
              giving us feedback
            </p>
            <button>Submit</button>
          </div> */}
        </>
      ) : (
        <div className="">
          <p>Welcome guest</p>
        </div>
      )}
    </>
  );
}
