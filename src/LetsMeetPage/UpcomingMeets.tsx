"use client";

import { DocumentData, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/LetsMeet.module.css";
import LetsMeetList from "./components/LetsMeetList";
import OverlayFriendList from "./components/OverlayFriendList";
import PopupFriendListOverlay from "./components/PopupFriendListOverlay";

export default function UpcomingMeets() {
  const [triggerPopup, setTriggerPopup] = useState(false);
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [meets, setMeets] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    const ref = collection(db, "users", id, "meet");

    const unsubscribe = onSnapshot(ref, async (snapshot) => {
      const docs: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({ id: doc.id, ...data } as DocumentData);
      });
      setMeets(docs);
    });
    setIsLoading(false);
    return () => unsubscribe();
  }, [id]);

  return (
    <>
      <div className="mb-8">
        <h2 className="mx-8 my-2 md:mx-32">Upcoming Meets</h2>
        <div className="flex flex-col w-full justify-center items-center gap-4">
          <div className={styles.list_box}>
            {meets.map((data: DocumentData) => (
              <LetsMeetList data={data} key={data.id} type={"meet"} />
            ))}
          </div>
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
