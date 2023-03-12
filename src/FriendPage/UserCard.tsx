"use client";

import Image from "next/image";
import stylesCard from "../../styles/UserCard.module.css";
import stylesImage from "../../styles/Image.module.css";
import { DocumentData } from "firebase/firestore";
import SendFriendRequest from "../../lib/AddandAcceptFriends/SendFriendRequest";
import useAuthStore from "../../store/authStore";
import { useRouter } from "next/navigation";

export default function UserCard({ user }: DocumentData) {
  const { id } = useAuthStore();
  const router = useRouter();

  async function handleAdd() {
    SendFriendRequest(user.id, id);
    router.push("friends");
  }

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
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
