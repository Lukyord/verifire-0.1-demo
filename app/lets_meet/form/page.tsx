// @ts-nocheck

"use client";

import { doc, DocumentData, getDoc } from "firebase/firestore";
import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import LetsMeetForm from "../../../src/LetsMeetPage/LetsMeetForm";
import stylesImage from "../../../styles/Image.module.css";
import type { PageComponent } from "types";

interface Props {
  searchParams: {
    id: string;
    displayName: string;
  };
}

const Page: PageComponent<Props> = ({ searchParams }) => {
  const [friendPhotoURL, setFriendPhotoURL] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const displayName = params.get("displayName");

  useEffect(() => {
    if (id === "" || displayName === "") {
      return;
    }

    console.log(window.location.search);
    // console.log(searchParams);
    console.log(params);
    console.log(id, displayName);

    const getFriendProfile = async () => {
      const friendRef = doc(db, "users", id);
      const friendDoc = await getDoc(friendRef);
      const friendData = friendDoc.data() as DocumentData;
      return friendData.photoURL;
    };
    getFriendProfile().then((url) => setFriendPhotoURL(url));

    setIsLoading(false);
  }, [params]);

  if (isLoading) {
    return <div className="text-center">loading...</div>;
  }

  return (
    <ProtectedRoute>
      <div className="m-8 md:mx-32 font-bold flex flex-row items-center justify-between">
        <div>
          <div className="text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem]">
            <h1 className="font-helvetica_outline tracking-tight">Meet with</h1>
            <h1 className="tracking-tight">{displayName}</h1>
          </div>
          {/* <p className="text-sm font-normal">{searchParams.id}</p> */}
          <p className="font-normal text-md md:text-lg">Set up Meet</p>
        </div>
        <Image
          className={`${stylesImage.circular_pic_custom} w-28 h-28 md:w-40 md:h-40`}
          src={
            friendPhotoURL ??
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          priority
          alt="user profile image"
          width={1080}
          height={1080}
        />
      </div>
      <section className="w-[90%] mx-auto flex flex-col mb-8">
        <LetsMeetForm friendId={searchParams.id} />
      </section>
    </ProtectedRoute>
  );
};

export default Page;
