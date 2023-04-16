"use client";

import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import styles from "../../styles/Form.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

interface PhoneForm {
  phone: string;
}

export default function PhoneForm() {
  const router = useRouter();
  const auth = getAuth();
  const [expandForm, setExpandForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { setPhone, user, setEmail, setId } = useAuthStore();
  const [value, setValue] = useState<string | undefined>();

  useEffect(() => {
    const uid = user?.uid;
    const email = user?.email;

    if (uid) {
      setId(uid);
      console.log(useAuthStore.getState().id);
    }

    if (email) {
      setEmail(email);
      console.log(useAuthStore.getState().email);
    }
  }, []);

  function generateRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "normal",
      },
      auth
    );
  }

  async function requestOtp() {
    const phone = value || "";
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
      <div className="flex flex-col gap-5">
        <div
          className={`${styles.input_group} 
        `}
        >
          <PhoneInput
            placeholder="Enter phone number"
            value={value}
            onChange={setValue}
            className={styles.input_text}
          />
          <p onClick={() => console.log(value)}>O</p>
        </div>
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
          <button
            type="submit"
            className={`${styles.button}`}
            onClick={() => {
              setExpandForm(true);
              requestOtp();
            }}
          >
            Request OTP
          </button>
        </div>
      )}

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
