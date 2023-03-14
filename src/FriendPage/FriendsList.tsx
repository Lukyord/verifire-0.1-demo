"use client";

import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuthStore from "../../store/authStore";
import UserList from "./components/UserList";
import styles from "../../styles/UserList.module.css";

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
    <div className={styles.list_box}>
      {friendslist.map((data: DocumentData) => (
        <UserList data={data} key={data.id} type="friends" />
      ))}
      {/* <button onClick={() => console.log(friendslist)}>o</button> */}
    </div>
  );
}
