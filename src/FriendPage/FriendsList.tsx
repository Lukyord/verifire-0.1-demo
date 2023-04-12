"use client";

import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuthStore from "../../store/authStore";
import UserList from "./components/UserList";
import styles from "../../styles/UserList.module.css";

export default function FriendsList() {
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [friendslist, setFriendslist] = useState<DocumentData[]>([]);

  useEffect(() => {
    if (id === "") {
      return;
    }

    // const ref = collection(db, "users", id, "friend");

    // const unsubscribe = onSnapshot(ref, async (snapshot) => {
    //   const docs: DocumentData[] = [];
    //   snapshot.forEach((doc) => {
    //     const data = doc.data();
    //     docs.push({ id: doc.id, ...data } as DocumentData);
    //   });
    //   setFriendslist(docs);
    // });
    // setIsLoading(false);
    // return () => unsubscribe();
    const getFriendsList = async () => {
      setIsLoading(true);
      const friendsRef = collection(db, "users", id, "friend");
      const friendsSnapshot = await getDocs(friendsRef);
      const friendsDocs = friendsSnapshot.docs;
      const friendIds = friendsDocs.map((friendDoc) => friendDoc.id);

      const friendsData = await Promise.all(
        friendIds.map(async (friendId) => {
          const friendRef = doc(db, "users", friendId);
          const friendDoc = await getDoc(friendRef);
          const friendData = friendDoc.data() as DocumentData;
          return { id: friendId, ...friendData };
        })
      );

      setFriendslist(friendsData);
      setIsLoading(false);
    };

    getFriendsList();
  }, [id]);

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {friendslist.length === 0 ? (
        <p className="text-center">
          No one is in your friend list yet, maybe add some?
        </p>
      ) : (
        <div className={styles.list_box}>
          {friendslist.map((data: DocumentData) => (
            <UserList data={data} key={data.id} type="friends" />
          ))}
        </div>
      )}
    </div>
  );
}
