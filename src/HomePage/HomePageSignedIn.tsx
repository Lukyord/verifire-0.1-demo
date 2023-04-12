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
      <h1>Welcome...</h1>
      <h1>{displayName}</h1>
      {/* <p>{availableHeight}</p> */}
      <Widget />
      <FeedbackSection />
      <HomepageFooter />
    </div>
  );
}
