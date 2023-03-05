"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
