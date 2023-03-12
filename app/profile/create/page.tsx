"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../middleware/ProtectedRoute";

export default function CreateProfile() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div>Let's create your profile</div>
      <button onClick={() => router.push("/profile/edit")}>Next</button>
    </ProtectedRoute>
  );
}
