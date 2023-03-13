"use client";

import Image from "next/image";
import stylesCard from "../../../styles/UserCard.module.css";
import stylesImage from "../../../styles/Image.module.css";
import { DocumentData } from "firebase/firestore";
import useAuthStore from "../../../store/authStore";
import { useRouter } from "next/navigation";
import sendFriendRequest from "../../../lib/AddandAcceptFriends/sendFriendRequest";
import { useEffect, useState } from "react";
import checkAlreadyFriendOrThemself from "../../../lib/AddandAcceptFriends/checkAlreadyFriendOrThemself";

export default function UserCard({ user }: DocumentData) {
  const [searchResult, setSearchResult] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const { id, userData } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    checkAlreadyFriendOrThemself(user.id, id)
      .then((status: string) => setSearchResult(status))
      .then(() => setLoading(false));
  }, [user]);

  async function handleAdd() {
    if (userData) {
      sendFriendRequest(user.id, id, userData);
    }
    router.push("friends");
  }

  if (loading) return <div>loading...</div>;

  return (
    <div className={stylesCard.user_card}>
      <h1>{user.displayName}</h1>
      <Image
        className={stylesImage.circular_pic}
        src={
          user.photoURL === ""
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            : user.photoURL
        }
        alt="user profile image"
        width={1080}
        height={1080}
      />
      {searchResult === "ok" ? (
        <button onClick={handleAdd}>Add</button>
      ) : (
        <div>
          {searchResult === "yourself" && <p>Can't add yourself as a friend</p>}
          {searchResult === "already friend" && <p>Already friend</p>}
        </div>
      )}
    </div>
  );
}
