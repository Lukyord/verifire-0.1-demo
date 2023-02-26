"use client";

import React, { useState } from "react";
import { FingerPrintIcon, AtSymbolIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signInValidationSchema } from "../../lib/ValidationSchema";

export default function SignInForm() {
  const [show, setShow] = useState(false);

  async function onSubmit(values: SignInData) {
    console.log(values);
  }

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={signInValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
      }}
    >
      {({ isSubmitting, isValidating, errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} ${
              errors.email && touched.email ? "border-rose-600" : ""
            }`}
          >
            <Field
              name="email"
              type="email"
              className={styles.input_text}
              placeholder="Email"
            />
            <span className="icon flex items-center px-4">
              <AtSymbolIcon className="w-8 h-8" />
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
              <FingerPrintIcon className="w-8 h-8 cursor-pointer" />
            </span>
          </div>
          <div className="input-button">
            <button
              type="submit"
              className={`${styles.button}`}
              disabled={isSubmitting}
              onClick={() => console.log(isValidating, isSubmitting)}
            >
              Sign In
            </button>
          </div>
          {/* <ErrorMessage name="email" component="div" />
            <ErrorMessage name="password" component="div" /> */}
        </Form>
      )}
    </Formik>
  );
}
