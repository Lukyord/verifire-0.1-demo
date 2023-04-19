"use client";

import {
  ClockIcon,
  UserGroupIcon,
  UserPlusIcon,
} from "@heroicons/react/24/solid";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function FriendHeader() {
  const router = useRouter();
  const pathname = usePathname();

  function headerName(pathname: string) {
    if (pathname == "/friends") {
      return "Friends";
    } else if (pathname == "/friends/add") {
      return "Add Friend";
    } else if (pathname == "/friends/pending") {
      return "Pending Request";
    }
  }

  let header;
  if (pathname) {
    header = headerName(pathname);
  }

  return (
    <div className="flex flex-row justify-between m-4">
      <div className="text-start text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col gap-2">
        <h1 className="font-helvetica_outline tracking-tight">{header}</h1>
      </div>

      <div className="flex flex-row gap-4 md:gap-8 mr-2 md:mr-8 mt-2 md:mt-4">
        {header !== "Pending Request" && (
          <ClockIcon
            className="w-8 h-8 md:w-12 md:h-12 cursor-pointer"
            color="white"
            onClick={() => router.push("friends/pending")}
          />
        )}
        {header !== "Add Friend" && (
          <UserPlusIcon
            className="w-8 h-8 md:w-12 md:h-12 cursor-pointer"
            color="white"
            onClick={() => router.push("friends/add")}
          />
        )}
        {header !== "Friends" && (
          <UserGroupIcon
            className="w-8 h-8 md:w-12 md:h-12 cursor-pointer"
            color="white"
            onClick={() => router.push("friends")}
          />
        )}
      </div>
    </div>
  );
}
