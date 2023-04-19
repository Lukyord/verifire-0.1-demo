"use client";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuthStore from "../../store/authStore";
import LetsMeetList from "./components/LetsMeetList";
import styles from "../../styles/LetsMeet.module.css";

export default function PendingMeets() {
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingLetsMeetRequests, setPendingLetsMeetRequests] = useState<
    DocumentData[]
  >([]);

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
      setPendingLetsMeetRequests(docs);
    });
    setIsLoading(false);
    return () => unsubscribe();
  }, [id]);

  if (isLoading) {
    return <div>loading...</div>;
  }
  return (
    <>
      <h2 className="mx-8 my-4 md:mx-32">PendingMeets</h2>
      {pendingLetsMeetRequests.length === 0 ? (
        <p className="text-center my-4">No pending request :(</p>
      ) : (
        <div className={`${styles.list_box}`}>
          {pendingLetsMeetRequests.map((data: DocumentData) => (
            <LetsMeetList data={data} key={data.id} type={"request"} />
          ))}
        </div>
      )}
    </>
  );
}
