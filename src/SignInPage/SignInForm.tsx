"use client";

import React, { useState } from "react";
import { FingerPrintIcon, AtSymbolIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "../../lib/ValidationSchema";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";

export default function SignInForm() {
  const { signin } = useAuthStore();
  const [show, setShow] = useState(false);
  const router = useRouter();

  async function onSubmit(values: { email: string; password: string }) {
    const { email, password } = values;
    await signin(email, password);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values).then(() => {
          setSubmitting(false);
          router.push("/");
        });
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} group relative ${
              errors.email && touched.email ? "border-rose-600" : ""
            }`}
          >
            <Field
              name="email"
              type="email"
              className={styles.input_text}
              placeholder="Email"
            />
            <span className="icon flex items-center px-4 ">
              <AtSymbolIcon className="w-8 h-8" color="white" />
            </span>
          </div>
          <div
            className={`${styles.input_group} group relative ${
              errors.password && touched.password ? "border-rose-600" : ""
            } `}
          >
            <Field
              name="password"
              type={`${show ? "text" : "password"}`}
              className={styles.input_text}
              placeholder="Password"
            />
            <span
              className={`icon flex items-center px-4 text-xs ${styles.popup_balloon_password}`}
              data-tip="Show Password"
              onClick={() => setShow(!show)}
            >
              <FingerPrintIcon
                className="w-8 h-8 cursor-pointer"
                color="white"
              />
            </span>
          </div>
          <div className="button flex justify-center items-center mt-10">
            <button
              type="submit"
              className={`${styles.button}`}
              disabled={isSubmitting}
            >
              Sign In
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
