import { doc, getDoc, Firestore } from "firebase/firestore";
import { db } from "../../firebase";

export async function getUserData(uid: string): Promise<User | null> {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      const userData = userDoc.data() as User;
      return userData;
    } else {
      console.log("No such user document!");
      return null;
    }
  } catch (e) {
    console.error("Error getting user data:", e);
    return null;
  }
}
