"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EmergencyContactValidationSchema } from "../../lib/ValidationSchema";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function EmergencyContactForm({ userId }: { userId: string }) {
  const router = useRouter();
  const { setEmergencyContacts, setPhoneVerifying, signout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setPhoneVerifying(true);
  }, []);

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

    await updateDoc(doc(db, "users", userId), {
      emergencyContacts: useAuthStore.getState().emergencyContacts,
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
          <div>
            <div className="flex flex-row">
              <p className="ml-2 mb-1 text-sm w-3/5">Emergency Contact 1</p>
              <p className="ml-4 mb-1 text-sm w-2/5">Relationship</p>
            </div>
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
          </div>
          <div>
            <div className="flex flex-row">
              <p className="ml-2 mb-1 text-sm w-3/5">Emergency Contact 2</p>
              <p className="ml-4 mb-1 text-sm w-2/5">Relationship</p>
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
          </div>
          <div className="button flex justify-center items-center mt-10">
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
