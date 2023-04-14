"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";
import HistoryMeets from "../../src/HistoryMeetPage/HistoryMeets";

export default function HistoryMeet() {
  return (
    <ProtectedRoute>
      <div className="m-10 mb-2 md:text-6xl md:mx-32 text-3xl font-bold">
        <h1>History</h1>
        <h1>Meet</h1>
      </div>
      <HistoryMeets />
    </ProtectedRoute>
  );
}
