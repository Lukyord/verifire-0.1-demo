import { deleteDoc, doc, DocumentData, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { GetTimeInString } from "../Miscellaneous/GetDateInString";

export default async function acceptLetsMeetRequest(
  requestorId: string,
  currentUserId: string,
  LetsMeetId: string,
  LetsMeetData: DocumentData
) {
  try {
    await deleteDoc(doc(db, "users", currentUserId, "pendingMeet", LetsMeetId));
    console.log(
      "delete Meet rquest:",
      LetsMeetId,
      "from pending Let's Meet requests"
    );

    await setDoc(
      doc(db, "users", currentUserId, "meet", LetsMeetId),
      LetsMeetData
    );
    console.log("added meet:", LetsMeetId, "to", currentUserId, "meet list");

    await setDoc(
      doc(db, "users", requestorId, "meet", LetsMeetId),
      LetsMeetData
    );
    console.log("added meet:", LetsMeetId, "to", requestorId, "meet list");
  } catch (error) {
    console.error(error);
  }
}
