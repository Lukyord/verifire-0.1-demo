"use clinet";

import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/authStore";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

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
  }, [id]);

  return (
    <div>
      {pendingRequests.map((data: DocumentData) => (
        <div key={data.userData.id}>
          <h2>{data.userData.displayName}</h2>
          <p>{data.userData.dob}</p>
        </div>
      ))}
      {/* {pendingRequests && pendingRequests[0]} */}
      <button onClick={() => console.log(pendingRequests)}>o</button>
    </div>
  );
}
