import Image from "next/image";
import React from "react";
import useAuthStore from "../../store/authStore";
import FeedbackSection from "./components/FeedbackSection";
import HomepageFooter from "./components/HomepageFooter";
import Widget from "./components/Widget";
import stylesImage from "../../styles/Image.module.css";

export default function HomePageSignedIn() {
  const { displayName, photoURL } = useAuthStore();

  return (
    <div className="grow overflow-y-auto">
      <div className="flex flex-row justify-between">
        <div className="m-3 md:text-6xl md:mx-6 text-4xl ">
          <h1 className="font-helvetica_outline tracking-tight">Welcome...</h1>
          <h1 className="font-bold tracking-tight">{displayName}</h1>
        </div>
        <Image
          alt="profile picture"
          src={
            photoURL
              ? photoURL
              : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          }
          width={1080}
          height={1080}
          className={`${stylesImage.circular_pic_custom} w-20 h-20 md:w-24 md:h-24 mt-4 md:mt-8 mr-4 md:mr-8`}
        />
      </div>
      <Widget />
      <FeedbackSection />
      <HomepageFooter />
    </div>
  );
}
