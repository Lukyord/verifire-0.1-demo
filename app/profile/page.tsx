"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";

export default function Profile() {
  return (
    <ProtectedRoute>
      <div>Profile</div>
    </ProtectedRoute>
  );
}
