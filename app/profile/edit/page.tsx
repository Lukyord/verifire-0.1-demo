"use client";
import ProtectedRoute from "../../../middleware/ProtectedRoute";
import EditProfileForm from "../../../src/ProfilePage/EditProfileForm";

export default function EditProfile() {
  const handleUpload = (url: string) => {
    console.log("File uploaded:", url);
  };

  return (
    <ProtectedRoute>
      <section className="w-3/4 mx-auto flex flex-col mt-10 h-full">
        <h1 className="text-2xl font-bold mb-5">Edit Profile</h1>
        <EditProfileForm onUpload={handleUpload} />
      </section>
    </ProtectedRoute>
  );
}
