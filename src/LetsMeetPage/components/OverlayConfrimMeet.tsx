import { DocumentData } from "firebase/firestore";
import React from "react";
import acceptLetsMeetRequest from "../../../lib/LetsMeet/acceptLetsMeetRequest";
import styles from "../../../styles/Popup.module.css";

export default function OverlayConfrimMeet({
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
      <h1 className="mt-2">Confirm Meet</h1>
      <div className="text-center text-sm text-purple-700">
        <p>Note: Please end the meet within</p>
        <p>30 minutes after the meet end time</p>
      </div>
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
            acceptLetsMeetRequest(requestorId, currentUserId, data.id, data);
            setTrigger(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
