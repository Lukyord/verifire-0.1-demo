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
        <div className="text-[2.75rem] md:text-[5rem] leading-[2.75rem] md:leading-[5rem] flex flex-col my-8">
          <h1 className="font-helvetica_outline tracking-tight">Profile</h1>
          <h1 className="tracking-tight">setup</h1>
        </div>
        <EditProfileForm onUpload={handleUpload} />
      </section>
    </ProtectedRoute>
  );
}
