"use client";

import React from "react";
import { emerApi } from "../lib/SendingEmerNotification/api";
import HomePageSignedIn from "../src/HomePage/HomePageSignedIn";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user } = useAuthStore();

  async function handleClick() {
    try {
      await emerApi({
        emergencyContact1: "0899214213",
        relationship1: "Dad",
        emergencyContact2: "0818349831",
        relationship2: "Mom",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {user ? (
        <>
          <HomePageSignedIn />
        </>
      ) : (
        <div className="">
          <p>Welcome guest</p>
          <button onClick={handleClick}>make call</button>
        </div>
      )}
    </>
  );
}
