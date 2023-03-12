"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserProfiles() {
  const router = useRouter();
  const userId = useSearchParams();

  async function checkUserExist(uid: string): Promise<boolean> {
    console.log(userId);
    return true;
  }

  useEffect(() => {
    checkUserExist("asd");
  }, []);

  return <div>UserProfiles</div>;
}
