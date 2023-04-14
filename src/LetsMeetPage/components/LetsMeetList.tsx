"use client";

import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import getDisplayname from "../../../lib/Miscellaneous/GetDisplayname";
import getPicUrl from "../../../lib/Miscellaneous/GetPicUrl";
import useAuthStore from "../../../store/authStore";
import styles from "../../../styles/LetsMeet.module.css";
import Countdown from "./CountdownTimer";
import OverlayConfrimMeet from "./OverlayConfrimMeet";
import OverlayEndMeet from "./OverlayEndMeet";
import PopupConfirmMeetOverlay from "./PopupConfirmMeetOverlay";

export default function LetsMeetList({
  data,
  type,
}: {
  data: DocumentData;
  type: string;
}) {
  const [triggerPopup, setTriggerPopup] = useState(false);
  const { id } = useAuthStore();
  const [picURL, setPicURL] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (id === data.requestorId) {
      getPicUrl(data.recieverId).then((url) => {
        setPicURL(url);
      });
      getDisplayname(data.requestorId).then((name) => {
        setName(name);
      });
    } else {
      getPicUrl(data.requestorId).then((url) => {
        setPicURL(url);
      });
      getDisplayname(data.requestorId).then((name) => {
        setName(name);
      });
    }
  }, []);

  return (
    <div className={styles.list}>
      <div
        className={`flex flex-row items-center gap-2 ${
          type === "history" ? "w-full" : "justify-between"
        }`}
      >
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
          <h1 className="text-lg md:text-xl font-bold mb-3">{name}</h1>
          <p className="text-sm mb-3 leading-none">
            {data.about.substring(0, 13)}
            {data.about.length > 15 && "..."}
          </p>
          <p className="text-sm text-gray-600">at {data.place}</p>
          <p className="text-sm text-gray-600">{data.date}</p>
          <p className="text-sm text-gray-600">
            {data.timeFrom} - {data.timeTo}
          </p>
        </div>
      </div>

      {type === "request" && (
        <div className="flex flex-col h-5/6 justify-end items-center">
          <button
            className={`${styles.confirm_button} mt-16 ml-4`}
            onClick={() => setTriggerPopup(true)}
          >
            Confirm
          </button>
          <PopupConfirmMeetOverlay
            trigger={triggerPopup}
            setTrigger={setTriggerPopup}
          >
            <OverlayConfrimMeet
              setTrigger={setTriggerPopup}
              requestorId={data.requestorId}
              currentUserId={id}
              data={data}
            />
          </PopupConfirmMeetOverlay>
        </div>
      )}
      {type === "meet" && (
        <div className="flex flex-col h-5/6 justify-between items-center">
          <Countdown targetDate={data.timeStamp} />
          <button
            className={`${styles.confirm_button}`}
            onClick={() => setTriggerPopup(true)}
          >
            End meet
          </button>
          <PopupConfirmMeetOverlay
            trigger={triggerPopup}
            setTrigger={setTriggerPopup}
          >
            <OverlayEndMeet
              setTrigger={setTriggerPopup}
              requestorId={data.requestorId}
              currentUserId={id}
              data={data}
            />
          </PopupConfirmMeetOverlay>
        </div>
      )}
      {type === "history" && <div className="hidden"></div>}
    </div>
  );
}
