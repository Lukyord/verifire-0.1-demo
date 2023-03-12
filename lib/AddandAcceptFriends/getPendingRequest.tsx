import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getPendingRequest(currentUserId: string) {
  const pendingReq = await getDocs(
    collection(db, "users", currentUserId, "pendingFriend")
  ).then((snapshot) =>
    snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as DocumentData))
  );

  console.log(pendingReq);
  return pendingReq;
}
