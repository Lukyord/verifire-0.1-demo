"use client";

import React from "react";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmergencyContactValidationSchema } from "../../lib/ValidationSchema";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function EmergencyContactForm() {
  const router = useRouter();
  const { id, phone, email, setEmergencyContacts, setPhoneVerifying, signout } =
    useAuthStore();

  async function onSubmit(values: {
    emergencyContact1: string;
    relationship1: string;
    emergencyContact2: string;
    relationship2: string;
  }) {
    const {
      emergencyContact1,
      relationship1,
      emergencyContact2,
      relationship2,
    } = values;

    setEmergencyContacts({
      emergencyContact1: emergencyContact1,
      relationship1: relationship1,
      emergencyContact2: emergencyContact2,
      relationship2: relationship2,
    });

    await setDoc(doc(db, "users", id), {
      email: email,
      phone: phone,
      id: id,
      emergencyContacts: useAuthStore.getState().emergencyContacts,
      timestamp: serverTimestamp(),
      photoURL: "",
      verifireId: "",
      displayName: "",
      dob: "",
      gender: "",
      bio: "",
    });

    setPhoneVerifying(false);

    await signout();
  }

  return (
    <Formik
      initialValues={{
        emergencyContact1: "",
        relationship1: "",
        emergencyContact2: "",
        relationship2: "",
      }}
      validationSchema={EmergencyContactValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values).then(() => {
          setSubmitting(false);
          router.replace("sign_in");
        });
      }}
    >
      {({ isSubmitting, errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div className="flex flex-row w-full gap-2">
            <div
              className={`${styles.input_group} w-3/5 group relative${
                errors.emergencyContact1 && touched.emergencyContact1
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Field
                name="emergencyContact1"
                type="text"
                className={styles.input_text}
                placeholder="Emergency Contact 1"
              />
            </div>
            <div
              className={`${styles.input_group} w-2/5 group relative ${
                errors.relationship1 && touched.relationship1
                  ? "border-rose-600"
                  : ""
              } `}
            >
              <Field
                name="relationship1"
                type="text"
                className={styles.input_text}
                placeholder="Relationship 1"
              />
            </div>
          </div>
          <div className="flex flex-row w-full gap-2">
            <div
              className={`${styles.input_group} w-3/5 group relative${
                errors.emergencyContact2 && touched.emergencyContact2
                  ? "border-rose-600"
                  : ""
              }`}
            >
              <Field
                name="emergencyContact2"
                type="text"
                className={styles.input_text}
                placeholder="Emergency Contact 2"
              />
            </div>
            <div
              className={`${styles.input_group} w-2/5 group relative ${
                errors.relationship2 && touched.relationship2
                  ? "border-rose-600"
                  : ""
              } `}
            >
              <Field
                name="relationship2"
                type="text"
                className={styles.input_text}
                placeholder="Relationship 2"
              />
            </div>
          </div>
          <div className="button">
            <button
              type="submit"
              className={`${styles.button}`}
              disabled={isSubmitting}
            >
              Confirm
            </button>
          </div>
          {/* <ErrorMessage name="email" component="div" />
        <ErrorMessage name="password" component="div" /> */}
        </Form>
      )}
    </Formik>
  );
}
