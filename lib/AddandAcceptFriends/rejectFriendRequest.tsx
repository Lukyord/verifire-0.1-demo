import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function rejectFriendRequest(
  requesterId: string,
  currentUserId: string
) {
  try {
    await deleteDoc(
      doc(db, "users", currentUserId, "pendingFriend", requesterId)
    );
  } catch (error) {
    console.error(error);
  }
  console.log("delete user:", requesterId, "from pending friend requests");
  return null;
}
