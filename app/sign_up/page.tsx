import { useRouter } from "next/navigation";
import React from "react";
import SignUpForm from "../../src/SignUpForm/SignUpForm";

export default function SignUp() {
  const router = useRouter();

  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
      <title>VeriFire - Sign Up</title>
      <SignUpForm />
      <p className="text-center text-gray-400 ">
        Have an account?{" "}
        <text
          className="text-blue-700 cursor-pointer"
          onClick={() => router.push(`/login`)}
        >
          Sign In
        </text>
      </p>
    </section>
  );
}
