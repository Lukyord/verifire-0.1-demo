"use client";

import { Field, Form, Formik } from "formik";
import { LetsMeetValidationSchema } from "../../lib/ValidationSchema";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/Form.module.css";
import sendLetsMeetRequest from "../../lib/LetsMeet/sendLetsMeetRequest";
import { useRouter } from "next/navigation";
import {
  GetDateInString,
  GetTimeInString,
} from "../../lib/Miscellaneous/GetDateInString";

export default function LetsMeetForm({ friendId }: { friendId: string }) {
  const { id } = useAuthStore();
  const router = useRouter();

  async function onSubmit(values: {
    place: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    about: string;
  }) {
    const { place, date, timeFrom, timeTo, about } = values;
    const LetsMeetData: LetsMeetData = {
      place: place,
      date: date,
      timeFrom: timeFrom,
      timeTo: timeTo,
      about: about,
      requestorId: id,
      recieverId: friendId,
    };

    const letsMeetId = GetTimeInString() + id;
    sendLetsMeetRequest(friendId, letsMeetId, LetsMeetData);
    router.push("/lets_meet");
  }
  return (
    <div className="h-full">
      <Formik
        initialValues={{
          place: "",
          date: "",
          timeFrom: "",
          timeTo: "",
          about: "",
        }}
        validationSchema={LetsMeetValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 500);
          onSubmit(values);
        }}
      >
        {({ isSubmitting, isValidating, errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div
              className={`${styles.input_group} group relative ${
                errors.place && touched.place ? "border-rose-600" : ""
              }`}
            >
              <Field
                name="place"
                type="text"
                className={`${styles.input_text}`}
                placeholder="Place"
              />
            </div>
            <div
              className={`${styles.input_group} group relative ${
                errors.date && touched.date ? "border-rose-600" : ""
              }`}
            >
              <Field name="date" type="date" className={styles.input_text} />
            </div>
            <div className="flex flex-row w-full gap-2">
              <div
                className={`${styles.input_group} group relative w-1/2 ${
                  errors.timeFrom && touched.timeFrom ? "border-rose-600" : ""
                }`}
              >
                <Field
                  type="time"
                  id="timeFrom"
                  name="timeFrom"
                  className={styles.input_text}
                />
              </div>
              <div
                className={`${styles.input_group} group relative w-1/2 ${
                  errors.timeTo && touched.timeTo ? "border-rose-600" : ""
                }`}
              >
                <Field
                  type="time"
                  id="timeTo"
                  name="timeTo"
                  className={styles.input_text}
                />
              </div>
            </div>
            <div
              className={`${styles.input_group} group relative h-20 ${
                errors.about && touched.about ? "border-rose-600" : ""
              }`}
            >
              <Field
                name="about"
                as="textarea"
                className={styles.input_text}
                placeholder="About the meet"
              />
            </div>
            <div className="button">
              <button type="submit" className={`${styles.button} `}>
                Confirm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}