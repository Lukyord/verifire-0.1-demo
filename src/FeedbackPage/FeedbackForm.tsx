"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "../../styles/Form.module.css";
import { feedbackValidationSchema } from "../../lib/ValidationSchema";
import useAuthStore from "../../store/authStore";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import { GetDateInString } from "../../lib/Miscellaneous/GetDateInString";

export default function FeedbackForm() {
  const { id, email, phone, dob, gender } = useAuthStore();
  const router = useRouter();

  async function onSubmit(values: { topic: string; comment: string }) {
    const { topic, comment } = values;

    const feedbackId = GetDateInString() + id;
    console.log(feedbackId);
    await setDoc(doc(db, "feedback", feedbackId), {
      topic: topic,
      comment: comment,
      email: email,
      phone: phone,
      dob: dob,
      gender: gender,
      resolve: false,
    });
  }

  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-4">
      <title>VeriFire - Feedback</title>
      <Formik
        initialValues={{ topic: "", comment: "" }}
        validationSchema={feedbackValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
          onSubmit(values).then(() => {
            router.replace("/");
          });
        }}
      >
        {({ isSubmitting, isValidating, errors, touched }) => (
          <Form className="flex flex-col gap-5">
            <div
              className={`${styles.input_group} ${
                errors.topic && touched.topic ? "border-rose-600" : ""
              }`}
            >
              <Field
                name="topic"
                type="text"
                className={styles.input_text}
                placeholder="Topic"
              />
            </div>
            <div
              className={`${styles.input_group} group relative h-64 ${
                errors.comment && touched.comment ? "border-rose-600" : ""
              } `}
            >
              <Field
                name="comment"
                as="textarea"
                className={styles.input_text}
                placeholder="Comment"
              />
            </div>
            <div className="button">
              <button
                type="submit"
                className={`${styles.button}`}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
            {/* <ErrorMessage name="email" component="div" />
        <ErrorMessage name="password" component="div" /> */}
          </Form>
        )}
      </Formik>
    </section>
  );
}
