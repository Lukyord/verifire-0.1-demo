"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import PhoneForm from "../../../src/PhonePage/PhoneForm";
import useAuthStore from "../../../store/authStore";

export default function Phone() {
  const router = useRouter();
  const { setPhoneVerifying } = useAuthStore();

  useEffect(() => {
    setPhoneVerifying(true);
  }, []);
  return (
    <>
      <title>VeriFire - Phone Authentication</title>
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
        <div>Phone</div>
        <PhoneForm />
      </section>
    </>
  );
}
