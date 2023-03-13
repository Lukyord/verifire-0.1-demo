import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";

export default async function acceptFriendRequest(
  requesterId: string,
  currentUserId: string,
  friendData: DocumentData
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
      doc(db, "users", currentUserId, "friend", requesterId),
      friendData
    );
    console.log("added:", requesterId, "to", currentUserId, "friend list");
  } catch (error) {
    console.error(error);
  }
}
