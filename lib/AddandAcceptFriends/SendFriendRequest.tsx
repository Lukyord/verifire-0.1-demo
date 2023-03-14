import { doc, DocumentData, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function sendFriendRequest(
  friendId: string,
  currentUserId: string,
  userData: DocumentData
) {
  await setDoc(
    doc(db, "users", friendId, "pendingFriend", currentUserId),
    userData
  );
  console.log("request sent to:", friendId, " from:", currentUserId);
  return null;
}
