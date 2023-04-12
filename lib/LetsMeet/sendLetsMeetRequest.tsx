import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function sendLetsMeetRequest(
  friendId: string,
  letsMeetId: string,
  LetsMeetData: LetsMeetData
) {
  await setDoc(
    doc(db, "users", friendId, "pendingMeet", letsMeetId),
    LetsMeetData
  );
  console.log("Let's Meet request sent to:", friendId, " from:", letsMeetId);
  return null;
}
