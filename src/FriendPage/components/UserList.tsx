"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import acceptFriendRequest from "../../../lib/AddandAcceptFriends/acceptFriendRequest";
import rejectFriendRequest from "../../../lib/AddandAcceptFriends/rejectFriendRequest";
import { calculateAge } from "../../../lib/Miscellaneous/CalculateAge";
import useAuthStore from "../../../store/authStore";
import styles from "../../../styles/UserList.module.css";

export default function UserList({
  data,
  type,
}: {
  data: DocumentData;
  type: string;
}) {
  const router = useRouter();
  const { id, userData } = useAuthStore();
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

  async function handleAdd() {
    if (userData) {
      acceptFriendRequest(data.id, id, data, userData);
    }
  }

  async function handleReject() {
    rejectFriendRequest(data.id, id);
  }

  return (
    <div
      className={styles.list}
      onClick={() => router.push(`/profile/${data.id}`)}
    >
      <div className="flex flex-row gap-1 items-center">
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
        <h2>{data.displayName}, </h2>
        <p>{calculateAge(data.dob)}</p>
      </div>
      {type === "request" && (
        <div className="flex flex-row gap-1 p-2">
          <XCircleIcon
            className="w-8 h-8 cursor-pointer"
            color="gray"
            onClick={handleReject}
          />
          <CheckCircleIcon
            className="w-8 h-8 cursor-pointer"
            color="purple"
            onClick={handleAdd}
          />
        </div>
      )}
      {type === "friends" && (
        <div>
          <button className={`${styles.lets_meet_button}`}>Let's meet</button>
        </div>
      )}
    </div>
  );
}
