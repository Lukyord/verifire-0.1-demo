"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../middleware/ProtectedRoute";

export default function Phone() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div>Phone</div>
      <button onClick={() => router.replace("sign_up/phone/otp")}>otp</button>
    </ProtectedRoute>
  );
}
