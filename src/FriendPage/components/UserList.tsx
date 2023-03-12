import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import styles from "../../../styles/UserList.module.css";

export default function UserList(data: any) {
  return (
    <div className={styles.list}>
      <div className="flex flex-row gap-1 items-center">
        <Image
          className={`${styles.circular_pic}`}
          src={
            data.data.photoURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : data.data.photoURL
          }
          alt="user profile image"
          width={40}
          height={40}
        />
        <h2>{data.data.displayName}, </h2>
        <p>{data.data.dob}</p>
      </div>
      <div className="flex flex-row gap-1 p-2">
        <XCircleIcon className="w-8 h-8" color="gray" />
        <CheckCircleIcon className="w-8 h-8" color="purple" />
      </div>
    </div>
  );
}
