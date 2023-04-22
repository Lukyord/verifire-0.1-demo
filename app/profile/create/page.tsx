"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import styles from "../../../styles/Form.module.css";

export default function CreateProfile() {
  const router = useRouter();

  return (
    <ProtectedRoute>
      <div className="w-full h-[40rem] md:h-[30rem] flex flex-col justify-between items-center">
        <div></div>
        <div className="text-center text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col gap-2">
          <h1 className="font-helvetica_outline tracking-tight">
            Let's create
          </h1>
          <h1 className="tracking-tight">your profile</h1>
        </div>

        <div className="button w-full flex justify-center items-center">
          <Link href="/profile/edit">
            <button className={`${styles.button}`}>Next</button>
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
