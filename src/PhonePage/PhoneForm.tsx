"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import styles from "../../styles/Form.module.css";
import { phoneValidationSchema } from "../../lib/ValidationSchema";

interface PhoneForm {
  phone: string | null;
}

export default function PhoneForm() {
  const auth = getAuth();

  function generateRecaptcha() {
    const appVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
      },
      auth
    );
  }

  function requestOtp(values: PhoneForm) {
    const { phone } = values;
  }

  return (
    <Formik
      initialValues={{ phone: "" }}
      validationSchema={phoneValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
        requestOtp(values);
      }}
    >
      {({ isSubmitting, isValidating, errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} 
            ${errors.phone ? "border-rose-600" : ""}
        `}
          >
            <Field
              name="phone"
              type="text"
              className={styles.input_text}
              placeholder="Phone Number"
            />
          </div>
          <div className="button">
            <button
              type="submit"
              className={`${styles.button}`}
              // disabled={isSubmitting}
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
