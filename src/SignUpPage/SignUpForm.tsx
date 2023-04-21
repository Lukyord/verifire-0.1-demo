"use client";

import { useState } from "react";
import { FingerPrintIcon, AtSymbolIcon } from "@heroicons/react/24/solid";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpValidationSchema } from "../../lib/ValidationSchema";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function SignUpForm() {
  const auth = getAuth();
  const user = auth.currentUser;
  const { signup } = useAuthStore();
  const [show, setShow] = useState({ password: false, cpassword: false });
  const [id, setId] = useState("");
  const router = useRouter();

  async function onSubmit(values: { email: string; password: string }) {
    const { email, password } = values;

    await signup(email, password);

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setId(user.uid);
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          phone: "",
          id: user.uid,
          emergencyContacts: null,
          timestamp: serverTimestamp(),
          photoURL: "",
          verifireId: "",
          displayName: "",
          dob: "",
          gender: "",
          bio: "",
        });
      }
    });
  }

  return (
    <Formik
      initialValues={{ email: "", password: "", cpassword: "" }}
      validationSchema={signUpValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values).then(() => {
          setSubmitting(false);
          router.replace("sign_up/phone");
        });
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-3">
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
              <AtSymbolIcon className="w-8 h-8" color="white" />
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
              <FingerPrintIcon
                className="w-8 h-8 cursor-pointer"
                color="white"
              />
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
              <FingerPrintIcon
                className="w-8 h-8 cursor-pointer"
                color="white"
              />
            </span>
          </div>

          <div className="button flex justify-center items-center">
            <button
              type="submit"
              className={`${styles.button} mt-10`}
              disabled={isSubmitting}
            >
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
