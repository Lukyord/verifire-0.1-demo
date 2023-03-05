"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "../../middleware/ProtectedRoute";

export default function Profile() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div>Profile</div>
      <button onClick={() => router.push("/profile/create")}>create</button>
    </ProtectedRoute>
  );
}
