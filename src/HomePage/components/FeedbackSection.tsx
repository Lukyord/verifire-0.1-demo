import Link from "next/link";
import React from "react";

export default function FeedbackSection() {
  return (
    <div className="flex flex-col items-center justify-center my-36">
      <h1 className="text-3xl md:text-4xl text-center font-helvetica_outline tracking-normal">
        Your feedback is
      </h1>
      <h1 className="text-3xl md:text-4xl text-center font-helvetica_outline tracking-normal">
        valuable to VeriFire
      </h1>

      <p className="text-md md:text-xl text-center mt-4 tracking-tight">
        Help us create a better and safer dating
      </p>
      <p className="text-md md:text-xl text-center tracking-tight">
        platform for everyone by giving us feedback
      </p>
      <button className="bg-purple-500 text-white mx-3 px-10 py-2 rounded-2xl mt-10">
        <Link href="/feedback">Submit</Link>
      </button>
    </div>
  );
}
