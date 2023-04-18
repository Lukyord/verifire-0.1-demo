import React from "react";
import useAuthStore from "../../store/authStore";
import FeedbackSection from "./components/FeedbackSection";
import HomepageFooter from "./components/HomepageFooter";
import Widget from "./components/Widget";

export default function HomePageSignedIn() {
  const { displayName } = useAuthStore();
  // const availableHeight = window.screen.availHeight;

  return (
    <div className="grow overflow-y-auto">
      <div className="m-3 md:text-6xl md:mx-6 text-3xl ">
        <h1 className="font-helvetica_outline tracking-tight">Welcome...</h1>
        <h1 className="font-bold tracking-tight">{displayName}</h1>
      </div>

      <Widget />
      <FeedbackSection />
      <HomepageFooter />
    </div>
  );
}
