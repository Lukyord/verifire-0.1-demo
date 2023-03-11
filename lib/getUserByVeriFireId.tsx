import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export default async function getUserByVeriFireId(verifireId: string) {
  const q = query(
    collection(db, "users"),
    where("verifireId", "==", verifireId)
  );
  const querySnapshot = await getDocs(q);

  if (querySnapshot.empty) {
    return null;
  }

  const data = querySnapshot.docs[0].data();

  return data;
}
