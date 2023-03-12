"use client";
import Header from "../src/Header/Header";
import Overlay from "../src/MobileNavBar/components/Overlay";
import MobileNavBar from "../src/MobileNavBar/MobileNavBar";
import "../styles/globals.css";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { init, loading, user, phoneVerifying, setLoading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    init();
    setLoading(false);

    if (typeof window !== "undefined") {
      // Check if the page is being loaded or refreshed
      if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        // If the page is being refreshed, navigate the user to the homepage
        router.push("/");
      }
    }
  }, []);

  return (
    <html>
      <head />
      <body>
        {loading && <div>loading</div>}
        {!loading && !phoneVerifying && (
          <div className="relative h-screen w-screen flex flex-col bg-slate-100">
            {/* ==================== Navigation Bar ==================== */}
            <Overlay />
            <MobileNavBar />
            <Header />
            {/* ======================================================== */}
            {children}
          </div>
        )}
        {!loading && phoneVerifying && (
          <div className="relative h-screen w-screen flex flex-col bg-slate-100">
            {children}
          </div>
        )}
      </body>
    </html>
  );
}
