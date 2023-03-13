import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function rejectFriendRequest(
  requesterId: string,
  currentUserId: string
) {
  console.log(requesterId);
  console.log(currentUserId);
  try {
    await deleteDoc(
      doc(db, "users", currentUserId, "pendingFriend", requesterId)
    );
  } catch (error) {
    console.error(error);
  }
  console.log("deletee request from:", requesterId);
  return null;
}
