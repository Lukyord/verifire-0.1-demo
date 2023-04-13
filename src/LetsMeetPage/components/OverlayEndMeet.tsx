import { DocumentData } from "firebase/firestore";
import React from "react";
import endMeet from "../../../lib/LetsMeet/endMeet";
import styles from "../../../styles/Popup.module.css";

export default function OverlayEndMeet({
  setTrigger,
  requestorId,
  currentUserId,
  data,
}: {
  setTrigger: (value: boolean) => void;
  requestorId: string;
  currentUserId: string;
  data: DocumentData;
}) {
  return (
    <div className="flex flex-col justify-around items-center h-full">
      <h1 className="mt-2">End Meet</h1>
      <div className="flex flex-row gap-14">
        <button
          className={styles.popup_cancel_button}
          onClick={() => setTrigger(false)}
        >
          Cancel
        </button>
        <button
          className={styles.popup_confirm_button}
          onClick={() => {
            endMeet(requestorId, currentUserId, data.id, data);
            setTrigger(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
