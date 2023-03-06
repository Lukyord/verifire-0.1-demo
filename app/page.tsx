"use client";

import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { db } from "../firebase";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user } = useAuthStore();
  const router = useRouter();

  async function checkVeriFireIdExists(
    uid: string
  ): Promise<boolean | undefined> {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists() && docSnapshot.data()?.verifireId === "") {
        return true;
      } else {
        return false;
      }
    }
  }

  useEffect(() => {
    if (user) {
      checkVeriFireIdExists(user.uid).then((idNotExists) => {
        if (idNotExists) {
          router.push("/profile/create");
        } else {
          console.log("id exists");
        }
      });
    }
  }, []);

  return (
    <>
      {user ? (
        <div className="">
          <p>Logged In</p>
        </div>
      ) : (
        <div className="">
          <p>Welcome guest</p>
        </div>
      )}
    </>
  );
}
