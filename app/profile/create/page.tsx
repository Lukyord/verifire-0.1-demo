"use client";

import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import styles from "../../../styles/Form.module.css";

export default function CreateProfile() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="text-center text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col gap-2 mt-20">
        <h1 className="font-helvetica_outline tracking-tight">Let's create</h1>
        <h1 className="tracking-tight">your profile</h1>
      </div>

      <div className="button w-full flex justify-center items-center mt-20">
        <button
          onClick={() => router.push("/profile/edit")}
          className={`${styles.button}`}
        >
          Next
        </button>
      </div>
    </ProtectedRoute>
  );
}
