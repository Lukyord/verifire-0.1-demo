"use client";

import { PencilIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { calculateAge } from "../../lib/Miscellaneous/CalculateAge";
import ProtectedRoute from "../../middleware/ProtectedRoute";
import useAuthStore from "../../store/authStore";
import stylesImage from "../../styles/Image.module.css";
import styles from "../../styles/UserList.module.css";

export default function Profile() {
  const { signout, verifireId, photoURL, displayName, dob, bio } =
    useAuthStore();
  const router = useRouter();

  async function handleSignOut() {
    await signout();
    router.push("/");
  }
  return (
    <ProtectedRoute>
      <div className="m-8 md:text-6xl md:mx-32 text-2xl font-bold">
        <h1>{displayName}'s</h1>
        <h1>Profile</h1>
      </div>
      <div className="relative flex items-center justify-center">
        <div
          onClick={() => router.push("/profile/edit")}
          className="ml-16 p-2 absolute bg-slate-200 rounded-full top-0 left-1/2 transform -translate-x-1/2 cursor-pointer"
        >
          <PencilIcon className="w-8 h-8" color="gray" />
        </div>
        <Image
          className={`${stylesImage.circular_pic_profile_page}`}
          src={
            photoURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : photoURL
          }
          unoptimized
          alt="user profile image"
          width={1080}
          height={1080}
        />
      </div>
      {verifireId === "" ? (
        <button onClick={() => router.push("/profile/create")}>create</button>
      ) : (
        <>
          {/* <button onClick={() => router.push("/profile/edit")}>edit</button> */}
          <div>
            <p className="text-center text-2xl md:text-3xl font-bold">
              {displayName}, {calculateAge(dob)}
            </p>
            <p className="text-center text-sm my-2 text-gray-400">
              VeriFire Id: {verifireId}
            </p>
          </div>
        </>
      )}
      <div className="flex justify-center items-center">
        <button
          onClick={handleSignOut}
          className={`${styles.lets_meet_button} md:px-16 md:py-1  mt-4`}
        >
          Sign out
        </button>
      </div>
    </ProtectedRoute>
  );
}
