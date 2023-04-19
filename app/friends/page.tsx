"use client";

import ProtectedRoute from "../../middleware/ProtectedRoute";
import FriendHeader from "../../src/FriendPage/FriendHeader";
import FriendsList from "../../src/FriendPage/FriendsList";

export default function Friends() {
  return (
    <ProtectedRoute>
      <div className="overflow-y-auto">
        <FriendHeader />
        <FriendsList />
      </div>
    </ProtectedRoute>
  );
}
