"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../../middleware/ProtectedRoute";

export default function OTP() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div>OTP</div>
      <button onClick={() => router.replace("sign_up/emergency_contact")}>
        emergency contact
      </button>
    </ProtectedRoute>
  );
}
