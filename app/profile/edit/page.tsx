"use client";
import ProtectedRoute from "../../../middleware/ProtectedRoute";

export default function EditProfile() {
  return (
    <ProtectedRoute>
      <p>Edit Profile</p>
    </ProtectedRoute>
  );
}
