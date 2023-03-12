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
        // <div key={data.userData.id} className={styles.list}>
        //   <div className="flex flex-row gap-1 items-center">
        //     <Image
        //       className={`${styles.circular_pic}`}
        //       src={
        //         data.userData.photoURL === ""
        //           ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        //           : data.userData.photoURL
        //       }
        //       alt="user profile image"
        //       width={40}
        //       height={40}
        //     />
        //     <h2>{data.userData.displayName}, </h2>
        //     <p>{data.userData.dob}</p>
        //   </div>
        //   <div className="flex flex-row gap-1 p-2">
        //     <CheckCircleIcon className="w-8 h-8" color="gray" />
        //     <XCircleIcon className="w-8 h-8" color="gray" />
        //   </div>
        // </div>
        <UserList data={data.userData} key={data.userData.id} />
      ))}
    </div>
  );
}
