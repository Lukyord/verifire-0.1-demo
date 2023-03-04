"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import styles from "../../styles/Form.module.css";
import { phoneValidationSchema } from "../../lib/ValidationSchema";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";

interface PhoneForm {
  phone: string;
}

export default function PhoneForm() {
  const router = useRouter();
  const auth = getAuth();
  const [expandForm, setExpandForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { setPhone } = useAuthStore();

  function generateRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
      },
      auth
    );
  }

  async function requestOtp(values: PhoneForm) {
    const { phone } = values;
    setPhoneNumber(phone);
    generateRecaptcha();
    let appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phone, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function handleOtpChange(event: React.ChangeEvent<HTMLInputElement>) {
    const OTP = event.target.value;
    setOtp(OTP);
  }

  async function verifyOtp() {
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(() => {
        console.log("verified");
        setPhone(phoneNumber);
        router.replace("sign_up/emergency_contact");
      })
      .catch((error: string) => {
        console.log(error);
      });
  }

  return (
    <>
      <Formik
        initialValues={{ phone: "" }}
        validationSchema={phoneValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
          setExpandForm(true);
          requestOtp(values);
        }}
      >
        {({ isSubmitting, isValidating, errors, touched }) => (
          <Form className="flex flex-col gap-5">
            <div
              className={`${styles.input_group} 
            ${errors.phone && touched.phone ? "border-rose-600" : ""}
        `}
            >
              <Field
                name="phone"
                type="text"
                className={styles.input_text}
                placeholder="Phone Number"
              />
            </div>
            {expandForm && (
              <>
                <div className={`${styles.input_group} `}>
                  <label htmlFor="otpInput">OTP</label>
                  <input
                    type="number"
                    className={styles.input_text}
                    id="otpInput"
                    value={otp}
                    onChange={handleOtpChange}
                  />
                </div>
              </>
            )}
            {!expandForm && (
              <div className="button">
                <button type="submit" className={`${styles.button}`}>
                  Request OTP
                </button>
              </div>
            )}
            {/* <ErrorMessage name="email" component="div" />
        <ErrorMessage name="password" component="div" /> */}
          </Form>
        )}
      </Formik>
      <div id="recaptcha-container"></div>
      {expandForm && (
        <div className="button">
          <button
            onClick={verifyOtp}
            disabled={otp.length != 6}
            className={`${styles.button}`}
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
}
