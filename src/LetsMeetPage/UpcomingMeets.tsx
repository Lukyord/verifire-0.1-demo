"use client";

import { useState } from "react";
import styles from "../../styles/LetsMeet.module.css";
import OverlayFriendList from "./components/OverlayFriendList";
import PopupFriendListOverlay from "./components/PopupFriendListOverlay";

export default function UpcomingMeets() {
  const [triggerPopup, setTriggerPopup] = useState(false);

  return (
    <>
      <div className="mb-8">
        <h2 className="mx-8 my-2 md:mx-32">Upcoming Meets</h2>
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <button
            className={`${styles.plus_button} w-5/6 md:w-[80%]`}
            onClick={() => setTriggerPopup(true)}
          >
            +
          </button>
        </div>
      </div>
      <PopupFriendListOverlay
        trigger={triggerPopup}
        setTrigger={setTriggerPopup}
      >
        <OverlayFriendList />
      </PopupFriendListOverlay>
    </>
  );
}
