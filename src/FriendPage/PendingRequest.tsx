"use clinet";

import { DocumentData } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import getPendingRequest from "../../lib/AddandAcceptFriends/getPendingRequest";
import useAuthStore from "../../store/authStore";

export default function PendingRequest() {
  const { id } = useAuthStore();
  const router = useRouter();
  const [pendingRequests, setPendingRequests] = useState<
    DocumentData | undefined | null
  >(null);

  useEffect(() => {
    if (!id) {
      return;
    }

    console.log(id);
    const requests = getPendingRequest(id);
    setPendingRequests(requests);
  }, [id]);

  return (
    <div>
      {/* {pendingRequests &&
        pendingRequests.map((friendRequest: DocumentData) => (
          <div key={friendRequest.id}>
            <h2>{friendRequest.displayName}</h2>
            <p>{friendRequest.dob}</p>
          </div>
        ))} */}
      {/* {pendingRequests && pendingRequests[0].id} */}
      <button onClick={() => console.log(pendingRequests)}>o</button>
    </div>
  );
}
