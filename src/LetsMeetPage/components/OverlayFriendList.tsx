"use client";

import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../../firebase";
import useAuthStore from "../../../store/authStore";
import OverlayUserList from "./OverlayUserList";
import styles from "../../../styles/UserList.module.css";

export default function FriendsList() {
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [friendslist, setFriendslist] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    const ref = collection(db, "users", id, "friend");

    const unsubscribe = onSnapshot(ref, async (snapshot) => {
      const docs: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({ id: doc.id, ...data } as DocumentData);
      });
      setFriendslist(docs);
    });
    setIsLoading(false);
    return () => unsubscribe();
  }, [id]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col w-full items-center justify-center overflow-y-auto">
      {friendslist.length === 0 ? (
        <p className="text-center">
          No one is in your friend list yet, maybe add some?
        </p>
      ) : (
        <>
          <h1 className="mt-2">Friend Lists</h1>
          <div className={styles.list_box_overlay}>
            {friendslist.map((data: DocumentData) => (
              <OverlayUserList data={data} key={data.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
