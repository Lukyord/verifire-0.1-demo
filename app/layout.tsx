"use client";
import Header from "../src/Header/Header";
import Overlay from "../src/MobileNavBar/components/Overlay";
import MobileNavBar from "../src/MobileNavBar/MobileNavBar";
import "../styles/globals.css";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { init, user } = useAuthStore();

  useEffect(() => {
    init();
    console.log(user);
  }, []);

  return (
    <html>
      <head />
      <body>
        <div className="relative h-screen w-screen flex flex-col bg-slate-100">
          {/* ==================== Navigation Bar ==================== */}

          <Overlay />
          <MobileNavBar />
          <Header />

          {/* ======================================================== */}
          {children}
        </div>
      </body>
    </html>
  );
}
