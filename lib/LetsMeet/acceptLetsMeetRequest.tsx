import { deleteDoc, doc, DocumentData, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { GetTimeInString } from "../Miscellaneous/GetDateInString";

export default async function acceptLetsMeetRequest(
  requestorId: string,
  currentUserId: string,
  LetsMeetId: string,
  LetsMeetData: DocumentData
) {
  const LetsMeedIdforRequestor = GetTimeInString() + currentUserId;
  const LetsMeedIdforCurrentUser = GetTimeInString() + requestorId;
  try {
    await deleteDoc(doc(db, "users", currentUserId, "pendingMeet", LetsMeetId));
    console.log(
      "delete user:",
      requestorId,
      "from pending Let's Meet requests"
    );

    await setDoc(
      doc(db, "users", currentUserId, "Meet", LetsMeedIdforCurrentUser),
      LetsMeetData
    );
    console.log("added:", requestorId, "to", currentUserId, "friend list");

    await setDoc(
      doc(db, "users", requestorId, "Meet", LetsMeedIdforRequestor),
      LetsMeetData
    );
    console.log("added:", currentUserId, "to", requestorId, "friend list");
  } catch (error) {
    console.error(error);
  }
}
