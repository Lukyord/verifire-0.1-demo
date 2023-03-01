"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";

export default function Friends() {
  return (
    <ProtectedRoute>
      <div>Friends</div>
    </ProtectedRoute>
  );
}
