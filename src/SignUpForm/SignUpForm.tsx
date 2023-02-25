"use client";
import React, { useState } from "react";
import {
  FingerPrintIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.css";
import { useRouter } from "next/navigation";

export default function SignUpForm() {
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();

  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
      <form className="flex flex-col gap-5">
        <div className={styles.input_group}>
          <input
            type="text"
            name="Username"
            placeholder="Username"
            className={styles.input_text}
          />
          <span className="icon flex items-center px-4">
            <UserCircleIcon className="w-8 h-8 cursor-pointer" />
          </span>
        </div>
        <div className={styles.input_group}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className={styles.input_text}
          />
          <span className="icon flex items-center px-4">
            <AtSymbolIcon className="w-8 h-8 cursor-pointer" />
          </span>
        </div>
        <div className={styles.input_group}>
          <input
            type={`${show.password ? "text" : "password"}`}
            name="password"
            placeholder="password"
            className={styles.input_text}
          />
          <span
            className="icon flex items-center px-4"
            onClick={() => setShow({ ...show, password: !show.password })}
          >
            {/* <HiFingerPrint size={25} /> */}
            <FingerPrintIcon className="w-8 h-8 cursor-pointer" />
          </span>
        </div>

        <div className={styles.input_group}>
          <input
            type={`${show.cpassword ? "text" : "password"}`}
            name="cpassword"
            placeholder="Confirm Password"
            className={styles.input_text}
          />
          <span
            className="icon flex items-center px-4"
            onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
          >
            <FingerPrintIcon className="w-8 h-8 cursor-pointer" />
          </span>
        </div>

        {/* login buttons */}
        <div className="input-button">
          <button type="submit" className={styles.button}>
            Login
          </button>
        </div>
      </form>

      {/* bottom */}
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
