"use client";
import Header from "../src/Header/Header";
import Overlay from "../src/MobileNavBar/components/Overlay";
import MobileNavBar from "../src/MobileNavBar/MobileNavBar";
import "../styles/globals.css";
import { useEffect, useState } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Background1 from "../src/Background/Background1";
import localFont from "@next/font/local";

const myFont = localFont({
  src: "../public/fonts/Helvetica-Outline.woff2",
  variable: "--font-my",
});

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
  const [lastpath, setLastpath] = useState("");

  async function checkVeriFireIdExists(
    uid: string
  ): Promise<boolean | undefined> {
    if (user) {
      const docRef = doc(db, "users", user.uid);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists() && docSnapshot.data()?.phone === "") {
        return false;
      } else if (
        docSnapshot.exists() &&
        docSnapshot.data()?.emergencyContacts === null
      ) {
        return false;
      } else if (lastpath === "edit" && docSnapshot.data()?.verifireId === "") {
        const data = await docSnapshot.data();
        if (data) setId(data.id);
        return false;
      } else if (
        docSnapshot.exists() &&
        docSnapshot.data()?.verifireId === ""
      ) {
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
    const params = window.location.href.split("/");
    setLastpath(params[params.length - 1]);
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
  }, [db, user, lastpath]);

  return (
    <html>
      <head />
      <body className={`${myFont.variable} font-sans`}>
        {loading && <div>loading</div>}
        {!loading && !phoneVerifying && (
          <div className="relative h-screen w-screen flex flex-col bg-slate-100">
            <div className="z-0">
              <Background1 />
              {/* <Background2 /> */}
            </div>
            <div className="h-full w-full overflow-x-hidden z-10">
              <Overlay />
              <MobileNavBar />
              <Header />
              {children}
            </div>
          </div>
        )}
        {!loading && phoneVerifying && (
          <div className="relative h-screen w-screen flex flex-col bg-slate-100 overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
