import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";

export default async function checkAlreadyFriendOrThemself(
  friendId: string,
  currentUserId: string
) {
  if (friendId === currentUserId) return "yourself";
  const ref = collection(db, "users", currentUserId, "friend");

  const q = query(ref, where("__name__", "==", friendId));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) return "already friend";
  return "ok";
}
