import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function SendFriendRequest(
  friendId: string,
  currentUserId: string
) {
  const currentUser = await getDoc(doc(db, "users", currentUserId));
  const currentUserData = currentUser.data();

  await setDoc(doc(db, "users", friendId, "pendingFriend", currentUserId), {
    currentUserData,
  });
  console.log("requst sent to:", friendId, " from:", currentUserId);
  return null;
}
