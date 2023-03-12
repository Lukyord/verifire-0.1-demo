import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export default async function getPendingRequest(currentUserId: string) {
  const usersRef = collection(db, "users");
  const userRef = doc(usersRef, currentUserId);
  const pendingFriendRef = collection(userRef, "pendingFriend");

  const requestsData = await getDocs(pendingFriendRef).then((snapshot) =>
    snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  );
  // const requests = querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));

  console.log(requestsData);
  return requestsData;
}
