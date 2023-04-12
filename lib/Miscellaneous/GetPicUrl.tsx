import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export default async function getPicUrl(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const friendData = await docSnapshot.data();
    if (friendData) {
      return friendData.photoURL;
    }
  }
  return "";
}
