"use client";

import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import acceptLetsMeetRequest from "../../../lib/LetsMeet/acceptLetsMeetRequest";
import getDisplayname from "../../../lib/Miscellaneous/GetDisplayname";
import getPicUrl from "../../../lib/Miscellaneous/GetPicUrl";
import useAuthStore from "../../../store/authStore";
import styles from "../../../styles/LetsMeetList.module.css";

export default function LetsMeetList({
  data,
  type,
}: {
  data: DocumentData;
  type: string;
}) {
  const router = useRouter();
  const { id, userData } = useAuthStore();
  const [picURL, setPicURL] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    getPicUrl(data.requestorId).then((url) => {
      if (url) {
        setPicURL(url);
      }
    });

    getDisplayname(data.requestorId).then((name) => {
      if (name) {
        setName(name);
      }
    });
  }, []);

  return (
    <div className={styles.list}>
      <Image
        className={`${styles.circular_pic}`}
        src={
          picURL === ""
            ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            : picURL
        }
        alt="user profile image"
        width={28}
        height={28}
        unoptimized
      />
      <div className="flex flex-col">
        <h1 className="text-lg md:text-xl font-bold mb-5">{name}</h1>
        <p className="text-sm">at {data.place}</p>
        <p className="text-sm">
          {data.timeFrom} - {data.timeTo}
        </p>
      </div>

      {type === "request" && (
        <div className=" md:ml-auto">
          <button
            className={`${styles.confirm_button} mt-16 ml-4`}
            onClick={() =>
              acceptLetsMeetRequest(data.requestorId, id, data.id, data)
            }
          >
            Confirm
          </button>
        </div>
      )}
    </div>
  );
}
