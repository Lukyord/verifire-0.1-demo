"use clinet";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { DocumentData, onSnapshot } from "firebase/firestore";
import { collection } from "@firebase/firestore";
import { db } from "../../firebase";
import styles from "../../styles/UserList.module.css";
import UserList from "./components/UserList";

export default function PendingRequest() {
  const { id } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    const ref = collection(db, "users", id, "pendingFriend");

    const unsubscribe = onSnapshot(ref, async (snapshot) => {
      const docs: DocumentData[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        docs.push({ id: doc.id, ...data } as DocumentData);
      });
      console.log(docs);
      setPendingRequests(docs);
    });
    setIsLoading(false);
    return () => unsubscribe();
  }, [id]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className={styles.list_box}>
      {pendingRequests.map((data: DocumentData) => (
        <UserList data={data.userData} key={data.userData.id} />
      ))}
    </div>
  );
}
