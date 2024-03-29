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
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

interface PhoneForm {
  phone: string;
}

export default function PhoneForm({ userId }: { userId: string }) {
  const router = useRouter();
  const auth = getAuth();
  const [expandForm, setExpandForm] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const { setPhone, setPhoneVerifying, user, setEmail, setId, signout } =
    useAuthStore();
  const [value, setValue] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  async function handlePhone() {
    const docRef = doc(db, "users", userId);
    const docSnapshot = await getDoc(docRef);
    if (docSnapshot.exists() && docSnapshot.data()?.phone === "") {
      await updateDoc(doc(db, "users", userId), {
        phone: phoneNumber,
      });
    }
  }

  async function verifyOtp() {
    setIsSubmitting(true);
    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(otp)
      .then(async () => {
        console.log("verified");
        setPhone(phoneNumber);
        handlePhone();
        console.log(userId);
        setIsSubmitting(false);
        window.recaptchaVerifier = null;
      })
      .catch((error: string) => {
        console.log(error);
        setIsSubmitting(false);
      });
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <div>
          <p className="ml-2 mb-1 text-sm">Country code & Phone number</p>

          <div
            className={`${styles.input_group} 
        `}
          >
            {/* <label htmlFor="phoneInput">Phone</label> */}
            <PhoneInput
              placeholder="Enter phone number"
              id="phoneInput"
              value={value}
              onChange={setValue}
              className={styles.input_text}
            />
          </div>
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
        <div className="button flex justify-center items-center">
          <button
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
        <div className="button flex justify-center items-center">
          <button
            onClick={async () => {
              verifyOtp();
              router.replace(`sign_up/emergency_contact/${userId}`);
            }}
            disabled={otp.length != 6 || isSubmitting}
            className={`${styles.button}`}
          >
            Confirm
          </button>
        </div>
      )}
    </>
  );
}
