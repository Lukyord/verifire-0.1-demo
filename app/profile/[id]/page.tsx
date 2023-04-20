"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { calculateAge } from "../../../lib/Miscellaneous/CalculateAge";
import { getUserData } from "../../../lib/userData/getUserData";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import stylesImage from "../../../styles/Image.module.css";
import styles from "../../../styles/UserList.module.css";

export default function UserProfiles({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [userData, setUserData] = useState<User>();

  async function fetchUserData(uid: string) {
    const data = await getUserData(uid);
    if (data) {
      setUserData(data);
    } else {
      console.log("User not found!");
    }
  }

  useEffect(() => {
    const userId = params.id;
    if (userId) {
      fetchUserData(userId);
    } else {
    }
  }, []);

  if (!userData) {
    return <p>loading...</p>;
  }
  return (
    <ProtectedRoute>
      <div className="mt-20 md:mt-10">.</div>
      <div className="mt-20 md:mt-20 relative flex flex-col mx-auto my-auto w-4/5 h-1/2 md:w-3/5 bg-purple-100 rounded-3xl">
        <Image
          className={`${stylesImage.circular_pic} absolute -top-24 md:-top-20 left-1/2 transform -translate-x-1/2`}
          src={
            userData.photoURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : userData.photoURL
          }
          priority
          alt="user profile image"
          width={1080}
          height={1080}
        />

        <p className="text-center mt-20 md:mt-24 text-2xl font-bold">
          {userData?.displayName}, {calculateAge(userData.dob)}
        </p>

        <p className="m-4 mx-8 md:m-10 md:mx-24">{userData.bio}</p>
        <Link
          href={{
            pathname: `/lets_meet/form`,
            query: { id: userData.id, displayName: userData.displayName },
          }}
        >
          <button
            className={`${styles.lets_meet_button} absolute -bottom-16 left-1/2 transform -translate-x-1/2`}
          >
            Let's meet
          </button>
        </Link>
      </div>
    </ProtectedRoute>
  );
}
