"use clinet";

import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "../../styles/UserList.module.css";
import Image from "next/image";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import UserList from "./components/UserList";

export default function PendingRequest() {
  const { id } = useAuthStore();
  const router = useRouter();
  const [pendingRequests, setPendingRequests] = useState<DocumentData>([]);

  useEffect(() => {
    if (!id) {
      return;
    }
    async function getPendingRequest() {
      const pendingReq = await getDocs(
        collection(db, "users", id, "pendingFriend")
      );
      setPendingRequests(pendingReq.docs.map((doc) => doc.data()));
    }
    getPendingRequest();
    console.log(pendingRequests);
  }, [id]);

  return (
    <div className={styles.list_box}>
      {pendingRequests.map((data: DocumentData) => (
        <UserList data={data.userData} key={data.userData.id} />
      ))}
    </div>
  );
}
