"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getUserData } from "../../../lib/userData/getUserData";
import ProtectedRoute from "../../../middleware/ProtectedRoute";

export default function UserProfiles({ params }: { params: { id: string } }) {
  const router = useRouter();

  async function fetchUserData(uid: string) {
    const userData = await getUserData(uid);
    if (userData) {
      console.log("User name:", userData.displayName);
      console.log("User email:", userData.email);
    } else {
      console.log("User not found!");
    }
  }

  useEffect(() => {
    const userId = params.id;
    if (userId) {
      fetchUserData(userId);
    } else {
    }
  });

  return (
    <ProtectedRoute>
      <div>
        <p>{params.id}</p>
      </div>
    </ProtectedRoute>
  );
}
