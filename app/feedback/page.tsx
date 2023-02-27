import React from "react";
import FeedbackFooter from "../../src/FeedbackPage/FeedbackFooter";
import FeedbackForm from "../../src/FeedbackPage/FeedbackForm";

export default function Feedback() {
  return (
    <div>
      <title>VeriFire - Feedback</title>
      <h1 className="text-4xl font-bold p-8 tracking-normal">Feedback</h1>
      <FeedbackForm />
      <FeedbackFooter />
    </div>
  );
}
