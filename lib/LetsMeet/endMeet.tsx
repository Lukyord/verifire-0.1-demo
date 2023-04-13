import { deleteDoc, doc, DocumentData, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default async function endMeet(
  requestorId: string,
  currentUserId: string,
  LetsMeetId: string,
  LetsMeetData: DocumentData
) {
  try {
    await deleteDoc(doc(db, "users", currentUserId, "meet", LetsMeetId));
    await deleteDoc(doc(db, "users", requestorId, "meet", LetsMeetId));
    console.log("delete Meet:", LetsMeetId, "from Meet");

    await setDoc(
      doc(db, "users", currentUserId, "historyMeet", LetsMeetId),
      LetsMeetData
    );
    console.log("added meet:", LetsMeetId, "to history for:", currentUserId);

    await setDoc(
      doc(db, "users", requestorId, "historyMeet", LetsMeetId),
      LetsMeetData
    );
    console.log("added meet:", LetsMeetId, "to history for:", requestorId);
  } catch (error) {
    console.error(error);
  }
}
