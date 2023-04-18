"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";
import PendingMeets from "../../src/LetsMeetPage/PendingMeets";
import UpcomingMeets from "../../src/LetsMeetPage/UpcomingMeets";

export default function LetsMeet() {
  return (
    <ProtectedRoute>
      <div className="mb-4">
        <div className="m-10 mb-2 md:text-6xl md:mx-32 text-3xl font-bold">
          <h1>Let's</h1>
          <h1>Meet</h1>
        </div>
        <UpcomingMeets />
        <PendingMeets />
      </div>
    </ProtectedRoute>
  );
}
