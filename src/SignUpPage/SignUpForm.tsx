"use client";

import { useState } from "react";
import {
  FingerPrintIcon,
  AtSymbolIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "../../lib/ValidationSchema";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";

export default function SignUpForm() {
  const { signup, user } = useAuthStore();
  const [show, setShow] = useState({ password: false, cpassword: false });
  const router = useRouter();

  async function onSubmit(values: { email: string; password: string }) {
    const { email, password } = values;
    await signup(email, password);
  }

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", cpassword: "" }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
        onSubmit(values).then(() => {
          router.replace("sign_up/phone");
        });
      }}
    >
      {({ errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} ${
              errors.username && touched.username ? "border-rose-600" : ""
            }  ${styles.popup_balloon}`}
            data-tip="Username must not contain blank space"
          >
            <Field
              name="username"
              type="text"
              className={`${styles.input_text}`}
              placeholder="Username"
            />

            <span className="icon flex items-center px-4">
              <UserCircleIcon className="w-8 h-8 cursor-pointer" />
            </span>
          </div>

          <div
            className={`${styles.input_group} ${
              errors.email && touched.email ? "border-rose-600" : ""
            } ${styles.popup_balloon}`}
            data-tip="Email must have '@' and '.com'"
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
            } ${styles.popup_balloon}`}
            data-tip="Password must be greater then 8 and less then 20 characters long"
          >
            <Field
              name="password"
              type={`${show.password ? "text" : "password"}`}
              className={styles.input_text}
              placeholder="Password"
            />
            <span
              className={`icon flex items-center px-4 text-xs ${styles.popup_balloon_password}`}
              data-tip="Show Password"
              onClick={() => setShow({ ...show, password: !show.password })}
            >
              <FingerPrintIcon className="w-8 h-8 cursor-pointer" />
            </span>
          </div>
          <div
            className={`${styles.input_group} ${
              errors.cpassword && touched.cpassword ? "border-rose-600" : ""
            } ${styles.popup_balloon}`}
            data-tip="Passwords must match"
          >
            <Field
              name="cpassword"
              type={`${show.cpassword ? "text" : "password"}`}
              placeholder="Confirm Password"
              className={styles.input_text}
            />
            <span
              className={`icon flex items-center px-4 text-xs ${styles.popup_balloon_password}`}
              data-tip="Show Password"
              onClick={() => setShow({ ...show, cpassword: !show.cpassword })}
            >
              <FingerPrintIcon className="w-8 h-8 cursor-pointer" />
            </span>
          </div>

          <div className="button">
            <button type="submit" className={`${styles.button}`}>
              Sign Up
            </button>
          </div>
          {/* 
                <ErrorMessage name="username" component="div" />
                <ErrorMessage name="email" component="div" />
                <ErrorMessage name="password" component="div" />
                <ErrorMessage name="cpassword" component="div" /> */}
        </Form>
      )}
    </Formik>
  );
}
