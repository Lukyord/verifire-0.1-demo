"use client";

import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/LetsMeet.module.css";
import LetsMeetList from "../LetsMeetPage/components/LetsMeetList";

export default function HistoryMeets() {
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [historyMeets, setHistoryMeets] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    const ref = collection(db, "users", id, "pendingMeet");

    const unsubscribe = onSnapshot(ref, async (snapshot) => {
      const docs: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({ id: doc.id, ...data } as DocumentData);
      });
      setHistoryMeets(docs);
    });
    setIsLoading(false);
    return () => unsubscribe();
  }, [id]);

  if (isLoading) {
    return <div className="text-center">loading...</div>;
  }
  return (
    <>
      {historyMeets.length === 0 ? (
        <p className="text-center mt-8">No history meet :(</p>
      ) : (
        <div className={styles.list_box}>
          {historyMeets.map((data: DocumentData) => (
            <LetsMeetList data={data} key={data.id} type={"history"} />
          ))}
        </div>
      )}
    </>
  );
}
