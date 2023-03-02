"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../middleware/ProtectedRoute";

export default function EmergencyContact() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div>EmergencyContact</div>
      <button onClick={() => router.replace("/sign_in")}>sign in</button>
    </ProtectedRoute>
  );
}
