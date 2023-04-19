"use client";

import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import useAuthStore from "../../store/authStore";
import UserList from "./components/UserList";
import styles from "../../styles/UserList.module.css";
import stylesForm from "../../styles/Form.module.css";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function FriendsList() {
  const { id } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [friendslist, setFriendslist] = useState<DocumentData[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<DocumentData[]>([]);

  function handleChange(searchValue: string) {
    setSearchTerm(searchValue);
    const filteredDocuments = friendslist.filter((document) =>
      document.displayName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setSearchResults(filteredDocuments);
  }

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
    return <div className="text-center">loading...</div>;
  }

  return (
    <div className="flex flex-col w-full items-center justify-center">
      {friendslist.length === 0 ? (
        <p className="text-center my-4">No one is in your friend list yet</p>
      ) : (
        <div className={styles.list_box}>
          <div className="w-4/5 md:w-3/5 mx-auto relative mt-4">
            <input
              type="text"
              placeholder="Search by DisplayName"
              value={searchTerm}
              onChange={(e) => handleChange(e.target.value)}
              className="w-full py-1 px-4 rounded-2xl bg-purple-100 border border-gray-300 shadow-2xl"
            />
            <button
              type="submit"
              className="absolute inset-y-0 right-4 pl-3 flex items-center"
            >
              <MagnifyingGlassIcon className="w-6 h-6" color="gray" />
            </button>
          </div>
          {searchTerm === ""
            ? friendslist.map((data: DocumentData) => (
                <UserList data={data} key={data.id} type="friends" />
              ))
            : searchResults.map((data: DocumentData) => (
                <UserList data={data} key={data.id} type="friends" />
              ))}
        </div>
      )}
    </div>
  );
}
