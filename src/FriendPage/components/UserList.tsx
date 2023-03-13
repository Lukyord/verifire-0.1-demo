"use client";

import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import acceptFriendRequest from "../../../lib/AddandAcceptFriends/acceptFriendRequest";
import rejectFriendRequest from "../../../lib/AddandAcceptFriends/rejectFriendRequest";
import useAuthStore from "../../../store/authStore";
import styles from "../../../styles/UserList.module.css";

export default function UserList(data: any) {
  const { id, userData } = useAuthStore();
  async function handleAdd() {
    acceptFriendRequest(data.data.id, id, data.data, userData);
  }

  async function handleReject() {
    rejectFriendRequest(data.data.id, id);
  }

  return (
    <div className={styles.list}>
      <div className="flex flex-row gap-1 items-center">
        <Image
          className={`${styles.circular_pic}`}
          src={
            data.data.photoURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : data.data.photoURL
          }
          alt="user profile image"
          width={40}
          height={40}
        />
        <h2>{data.data.displayName}, </h2>
        <p>{data.data.dob}</p>
      </div>
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
    </div>
  );
}
