"use client";

import ProtectedRoute from "../../../middleware/ProtectedRoute";
import EmergencyContactForm from "../../../src/PhonePage/EmergencyContactForm";

export default function EmergencyContact() {
  return (
    <ProtectedRoute>
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
        <EmergencyContactForm />
      </section>
    </ProtectedRoute>
  );
}
