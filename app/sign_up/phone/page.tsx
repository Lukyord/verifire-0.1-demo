"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import PhoneForm from "../../../src/PhonePage/PhoneForm";

export default function Phone() {
  const router = useRouter();
  return (
    <ProtectedRoute>
      <title>VeriFire - Phone Authentication</title>
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
        <div>Phone</div>
        <PhoneForm />
        <button onClick={() => router.replace("sign_up/emergency_contact")}>
          otp
        </button>
      </section>
    </ProtectedRoute>
  );
}
