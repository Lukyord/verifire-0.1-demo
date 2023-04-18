"use client";
import Header from "../src/Header/Header";
import Overlay from "../src/MobileNavBar/components/Overlay";
import MobileNavBar from "../src/MobileNavBar/MobileNavBar";
import "../styles/globals.css";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    init,
    setUserData,
    loading,
    user,
    phoneVerifying,
    setLoading,
    setData,
    setEmail,
    setId,
    setPhone,
    setEmergencyContacts,
  } = useAuthStore();
  const router = useRouter();

  async function checkVeriFireIdExists(
    uid: string
  ): Promise<boolean | undefined> {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists() && docSnapshot.data()?.verifireId === "") {
        setLoading(false);
        return true;
      } else {
        const data = await docSnapshot.data();
        if (data) {
          setData({
            bio: data.bio,
            displayName: data.displayName,
            dob: data.dob,
            gender: data.gender,
            photoURL: data.photoURL,
            verifireId: data.verifireId,
          });
          setEmail(data.email);
          setId(data.id);
          setPhone(data.phone);
          setEmergencyContacts(data.emergencyContacts);
          console.log(data);
          setUserData(data);
          setLoading(false);
        }
        return false;
      }
    }
  }

  useEffect(() => {
    init();
    if (user && !phoneVerifying) {
      checkVeriFireIdExists(user.uid).then((idNotExists) => {
        if (idNotExists) {
          router.push("/profile/create");
        } else {
          console.log("id exists");
        }
      });
    }
  }, [db, user]);

  return (
    <html>
      <head />
      <body>
        {loading && <div>loading</div>}
        {!loading && !phoneVerifying && (
          <div className="relative h-screen w-screen flex flex-col bg-slate-100 overflow-y-auto overflow-x-hidden">
            {/* ==================== Navigation Bar ==================== */}
            <Overlay />
            <MobileNavBar />
            <Header />
            {/* ======================================================== */}
            {children}
          </div>
        )}
        {!loading && phoneVerifying && (
          <div className="relative h-screen w-screen flex flex-col bg-slate-100 overflow-y-auto overflow-x-hidde">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
