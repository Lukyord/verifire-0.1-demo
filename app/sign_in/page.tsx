"use client";

import SignInFooter from "../../src/SignInPage/SignInFooter";
import SignInForm from "../../src/SignInPage/SignInForm";
import { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import Image from "next/image";
import Logo from "../../public/logo/logo.png";
import Background2 from "../../src/Background/Background2";

export default function SignIn() {
  const { setPhoneVerifying } = useAuthStore();

  useEffect(() => {
    setPhoneVerifying(false);
  }, []);
  return (
    <>
      <section className="w-3/4 mx-auto flex flex-col gap-10 mt-16 items-center z-20">
        <Background2 />
        <title>VeriFire - Sign In</title>
        <div className="text-center mb-10 flex flex-col justify-center items-center">
          <Image src={Logo} alt="VeriFire Logo" width={150} height={150} />
          <h1>Welcome!</h1>
          <p>Create your account here</p>
        </div>
        <div className="flex flex-col gap-2">
          <SignInForm />
          <SignInFooter />
        </div>
      </section>
    </>
  );
}
