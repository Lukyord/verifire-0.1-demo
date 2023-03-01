"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";

export default function LetsMeet() {
  return (
    <ProtectedRoute>
      <div>Let's Meet</div>
    </ProtectedRoute>
  );
}
