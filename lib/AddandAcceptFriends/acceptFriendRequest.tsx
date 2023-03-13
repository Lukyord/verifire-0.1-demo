import { deleteDoc, doc, DocumentData, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function acceptFriendRequest(
  requesterId: string,
  currentUserId: string,
  friendData: DocumentData,
  userData: DocumentData
) {
  try {
    await deleteDoc(
      doc(db, "users", currentUserId, "pendingFriend", requesterId)
    );
    console.log("delete user:", requesterId, "from pending friend requests");

    await setDoc(
      doc(db, "users", currentUserId, "friend", requesterId),
      friendData
    );
    console.log("added:", requesterId, "to", currentUserId, "friend list");

    await setDoc(
      doc(db, "users", requesterId, "friend", currentUserId),
      userData
    );
    console.log("added:", currentUserId, "to", requesterId, "friend list");
  } catch (error) {
    console.error(error);
  }
}
