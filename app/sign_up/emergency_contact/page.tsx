"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import useAuthStore from "../../../store/authStore";

export default function EmergencyContact() {
  const router = useRouter();
  const { setPhoneVerifying } = useAuthStore();

  useEffect(() => {
    setPhoneVerifying(false);
  }, []);
  return (
    <ProtectedRoute>
      <div>EmergencyContact</div>
      <button onClick={() => router.replace("/sign_in")}>sign in</button>
    </ProtectedRoute>
  );
}
