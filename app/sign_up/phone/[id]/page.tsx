"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProtectedRoute from "../../../../middleware/ProtectedRoute";
import Background2 from "../../../../src/Background/Background2";
import PhoneForm from "../../../../src/PhonePage/PhoneForm";
import useAuthStore from "../../../../store/authStore";

export default function Phone({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { setPhoneVerifying } = useAuthStore();

  useEffect(() => {
    setPhoneVerifying(true);
  }, []);
  return (
    <>
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20 z-20">
        <title>VeriFire - Phone Authentication</title>
        <Background2 />
        <div>Phone</div>
        <PhoneForm userId={params.id} />
      </section>
    </>
  );
}
