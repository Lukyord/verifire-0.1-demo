"use client";

import { doc, DocumentData, getDoc } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import { calculateAge } from "../../../lib/Miscellaneous/CalculateAge";
import styles from "../../../styles/UserList.module.css";

export default function UserList({ data }: { data: DocumentData }) {
  const router = useRouter();
  const [picURL, setPicURL] = useState("");

  async function getPicUrl() {
    const docRef = doc(db, "users", data.id);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      const friendData = await docSnapshot.data();
      if (friendData) {
        return friendData.photoURL;
      }
    }
  }

  useEffect(() => {
    getPicUrl().then((url) => {
      if (url) {
        setPicURL(url);
      }
    });
  }, []);

  return (
    <div className={styles.list_overlay}>
      <div
        className="flex flex-row gap-0.5 items-center"
        onClick={() => router.push(`/profile/${data.id}`)}
      >
        <Image
          className={`${styles.circular_pic}`}
          src={
            picURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : picURL
          }
          alt="user profile image"
          width={40}
          height={40}
          unoptimized
        />
        <p>{data.displayName}, </p>
        <p>{calculateAge(data.dob)}</p>
      </div>
      <Link
        href={{
          pathname: `/lets_meet/form`,
          query: { id: data.id, displayName: data.displayName },
        }}
      >
        <button className={`${styles.lets_meet_button_overlay}`}>
          <p className="text-xs">Let's meet</p>
        </button>
      </Link>
    </div>
  );
}
