"use client";

import SignInFooter from "../../src/SignInPage/SignInFooter";
import SignInForm from "../../src/SignInPage/SignInForm";
import { useEffect } from "react";
import useAuthStore from "../../store/authStore";

export default function SignIn() {
  const { setPhoneVerifying } = useAuthStore();

  useEffect(() => {
    setPhoneVerifying(false);
  }, []);
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
      <title>VeriFire - Sign In</title>
      <SignInForm />
      <SignInFooter />
    </section>
  );
}
