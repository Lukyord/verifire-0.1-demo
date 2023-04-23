"use client";

import Background2 from "../../../../src/Background/Background2";
import EmergencyContactForm from "../../../../src/PhonePage/EmergencyContactForm";

export default function EmergencyContact({
  params,
}: {
  params: { id: string };
}) {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20 z-20">
      <title>VeriFire - Emergency Contacts</title>
      <Background2 />
      <EmergencyContactForm userId={params.id} />
    </section>
  );
}
