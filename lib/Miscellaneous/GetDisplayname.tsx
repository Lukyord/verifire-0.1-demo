import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getDisplayname(userId: string) {
  const docRef = doc(db, "users", userId);
  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const friendData = await docSnapshot.data();
    if (friendData) {
      return friendData.displayName;
    }
  }
  return "";
}
