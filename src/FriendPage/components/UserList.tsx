"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import acceptFriendRequest from "../../../lib/AddandAcceptFriends/acceptFriendRequest";
import rejectFriendRequest from "../../../lib/AddandAcceptFriends/rejectFriendRequest";
import useAuthStore from "../../../store/authStore";
import styles from "../../../styles/UserList.module.css";

export default function UserList({
  data,
  type,
}: {
  data: DocumentData;
  type: string;
}) {
  const { id, userData } = useAuthStore();
  async function handleAdd() {
    if (userData) {
      acceptFriendRequest(data.id, id, data, userData);
    }
  }

  async function handleReject() {
    rejectFriendRequest(data.id, id);
  }

  return (
    <div className={styles.list}>
      <div className="flex flex-row gap-1 items-center">
        <Image
          className={`${styles.circular_pic}`}
          src={
            data.photoURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : data.photoURL
          }
          alt="user profile image"
          width={40}
          height={40}
        />
        <h2>{data.displayName}, </h2>
        <p>{data.dob}</p>
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
          <button className="bg-purple-500 text-white text-[] mx-3 px-3 py-2 rounded-2xl">
            Let's meet
          </button>
        </div>
      )}
    </div>
  );
}
