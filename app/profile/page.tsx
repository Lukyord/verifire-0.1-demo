"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/Image.module.css";

export default function Profile() {
  const { signout, verifireId, photoURL } = useAuthStore();
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
          unoptimized
          alt="user profile image"
          width={1080}
          height={1080}
        />
      </div>
      {verifireId === "" ? (
        <button onClick={() => router.push("/profile/create")}>create</button>
      ) : (
        <button onClick={() => router.push("/profile/edit")}>edit</button>
      )}
      <button onClick={handleSignOut}>sign out</button>
    </ProtectedRoute>
  );
}
