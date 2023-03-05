"use client";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import EditProfileForm from "../../../src/ProfilePage/EditProfileForm";

export default function EditProfile() {
  return (
    <ProtectedRoute>
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
        <p>Edit Profile</p>
        <EditProfileForm />
      </section>
    </ProtectedRoute>
  );
}
