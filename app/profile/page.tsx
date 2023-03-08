"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import useAuthStore from "../../store/authStore";

export default function Profile() {
  const { signout, user } = useAuthStore();
  const router = useRouter();

  async function handleSignOut() {
    await signout();
    router.push("/");
  }
  return (
    <ProtectedRoute>
      <div>Profile</div>
      <Image
        src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        // src="https://images.unsplash.com/photo-1666782199657-09885cc1c088"
        alt="user profile image"
        width={20}
        height={20}
      />
      <button onClick={() => router.push("/profile/create")}>create</button>
      <button onClick={handleSignOut}>sign out</button>
    </ProtectedRoute>
  );
}
