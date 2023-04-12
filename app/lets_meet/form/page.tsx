"use client";

import { doc, DocumentData, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import LetsMeetForm from "../../../src/LetsMeetPage/LetsMeetForm";
import stylesImage from "../../../styles/Image.module.css";

export default function page({
  searchParams,
}: {
  searchParams: { id: string; displayName: string };
}) {
  const [friendPhotoURL, setFriendPhotoURL] = useState<string>();

  useEffect(() => {
    const getFriendProfile = async () => {
      const friendRef = doc(db, "users", searchParams.id);
      const friendDoc = await getDoc(friendRef);
      const friendData = friendDoc.data() as DocumentData;
      return friendData.photoURL;
    };
    getFriendProfile().then((url) => setFriendPhotoURL(url));
  }, []);

  return (
    <ProtectedRoute>
      <div className="m-8 md:text-6xl md:mx-32 text-2xl font-bold flex flex-row items-center justify-between">
        <div>
          <h1>Meet with</h1>
          <h1>{searchParams.displayName}</h1>
          {/* <p className="text-sm font-normal">{searchParams.id}</p> */}
        </div>
        <Image
          className={`${stylesImage.circular_pic_small}`}
          src={
            friendPhotoURL ??
            '"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"'
          }
          unoptimized
          priority
          alt="user profile image"
          width={1080}
          height={1080}
        />
      </div>
      <section className="w-[90%] mx-auto flex flex-col h-full">
        <p>Set up Meet</p>
        <LetsMeetForm friendId={searchParams.id} />
      </section>
    </ProtectedRoute>
  );
}
