"use client";

import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { db } from "../firebase";
import HomePageSignedIn from "../src/HomePage/HomePageSignedIn";
import useAuthStore from "../store/authStore";

export default function page() {
  const { user, setData, setEmail, setId, setPhone, setEmergencyContacts } =
    useAuthStore();
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
        const data = docSnapshot.data();
        if (data) {
          setData({
            bio: data.bio,
            displayName: data.displayName,
            dob: data.dob,
            gender: data.gender,
            photoURL: data.photoURL,
            verifireId: data.verifireId,
          });
          setEmail(data.email);
          setId(data.id);
          setPhone(data.phone);
          setEmergencyContacts(data.emergencyContacts);
          console.log(data);
        }
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
  }, [db, user]);

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
