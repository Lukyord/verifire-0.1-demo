"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/Image.module.css";

export default function Profile() {
  const { signout, user, photoURL } = useAuthStore();
  const router = useRouter();

  async function handleSignOut() {
    await signout();
    router.push("/");
  }
  return (
    <ProtectedRoute>
      <div>Profile</div>
      <div className="flex items-center justify-center">
        <Image
          className={`${styles.circular_pic} `}
          src={
            photoURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : photoURL
          }
          alt="user profile image"
          width={20}
          height={20}
        />
      </div>
      <button onClick={() => router.push("/profile/create")}>create</button>
      <button onClick={handleSignOut}>sign out</button>
    </ProtectedRoute>
  );
}
