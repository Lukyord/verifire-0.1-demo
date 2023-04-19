"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";
import Background3 from "../../src/Background/Background3";
import HistoryMeets from "../../src/HistoryMeetPage/HistoryMeets";

export default function HistoryMeet() {
  return (
    <ProtectedRoute>
      {/* <Background3 /> */}
      <div className="z-20">
        <div className="m-10 mb-2 md:text-6xl md:mx-32 text-3xl font-bold">
          <div className="text-start text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col gap-2">
            <h1 className="font-helvetica_outline tracking-tight">History</h1>
            <h1 className="tracking-tight">Meet</h1>
          </div>
        </div>
        <HistoryMeets />
      </div>
    </ProtectedRoute>
  );
}
