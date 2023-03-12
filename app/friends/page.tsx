"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";
import FriendHeader from "../../src/FriendPage/FriendHeader";

export default function Friends() {
  return (
    <ProtectedRoute>
      <FriendHeader />
    </ProtectedRoute>
  );
}
