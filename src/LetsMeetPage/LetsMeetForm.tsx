"use client";

import { Field, Form, Formik } from "formik";
import { LetsMeetValidationSchema } from "../../lib/ValidationSchema";
import useAuthStore from "../../store/authStore";
import styles from "../../styles/Form.module.css";
import sendLetsMeetRequest from "../../lib/LetsMeet/sendLetsMeetRequest";
import { useRouter } from "next/navigation";
import { GetTimeInString } from "../../lib/Miscellaneous/GetDateInString";
import { useState, useEffect } from "react";

export default function LetsMeetForm({ friendId }: { friendId: string }) {
  const { id } = useAuthStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id === "") {
      return;
    }
    setIsLoading(false);
  }, [id]);

  async function onSubmit(values: {
    place: string;
    date: string;
    timeFrom: string;
    timeTo: string;
    about: string;
  }) {
    const { place, date, timeFrom, timeTo, about } = values;
    const targetDate = `${date}T${timeFrom}`;
    const emerDate = `${date}T${timeTo}`;
    console.log("timeFrom: ", timeFrom);
    console.log("timeTo: ", timeTo);
    console.log("targetDate: ", targetDate);
    const LetsMeetData: LetsMeetData = {
      place: place,
      date: date,
      timeFrom: timeFrom,
      timeTo: timeTo,
      about: about,
      requestorId: id,
      receiverId: friendId,
      timeStamp: targetDate,
      emerTimeStamp: emerDate,
    };

    const letsMeetId = GetTimeInString() + id;
    await sendLetsMeetRequest(friendId, letsMeetId, LetsMeetData);
  }

  if (isLoading) {
    return <div className="text-center">loading...</div>;
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
          onSubmit(values).then(() => {
            setSubmitting(false);
            router.push("/lets_meet");
          });
        }}
      >
        {({ isSubmitting, isValidating, errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <p className="ml-2 mb-1 text-sm">Place</p>
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
            </div>
            <div>
              <p className="ml-2 mb-1 text-sm">Date</p>
              <div
                className={`${styles.input_group} group relative ${
                  errors.date && touched.date ? "border-rose-600" : ""
                }`}
              >
                <Field name="date" type="date" className={styles.input_text} />
              </div>
            </div>
            <div>
              <div className="flex flex-row">
                <p className="ml-2 mb-1 text-sm w-1/2">From</p>
                <p className="ml-4 mb-1 text-sm w-1/2">To</p>
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
                    step={1800}
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
            </div>
            <div>
              <p className="ml-2 mb-1 text-sm">About the meet</p>
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
            </div>
            <div className="button flex justify-center items-center mt-2">
              <button
                type="submit"
                className={`${styles.button}`}
                disabled={isSubmitting}
              >
                Confirm
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
