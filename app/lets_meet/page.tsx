"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";
import PendingMeets from "../../src/LetsMeetPage/PendingMeets";
import UpcomingMeets from "../../src/LetsMeetPage/UpcomingMeets";

export default function LetsMeet() {
  return (
    <ProtectedRoute>
      <div className="mb-4">
        <div className="m-10 mb-2">
          <div className="text-start text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col gap-2">
            <h1 className="font-helvetica_outline tracking-tight">Let's</h1>
            <h1 className="tracking-tight">Meet</h1>
          </div>
        </div>
        <UpcomingMeets />
        <PendingMeets />
      </div>
    </ProtectedRoute>
  );
}
