"use client";

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
      <button onClick={() => router.push("/profile/create")}>create</button>
      <button onClick={handleSignOut}>sign out</button>
    </ProtectedRoute>
  );
}
