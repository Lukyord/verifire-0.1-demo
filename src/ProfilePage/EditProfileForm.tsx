"use client";
import styles from "../../styles/Form.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditProfileValidationSchema } from "../../lib/ValidationSchema";
import { useRouter } from "next/navigation";
import useAuthStore from "../../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

export default function EditProfileForm() {
  const router = useRouter();
  const { user, verifireId, displayName, dob, gender, bio } = useAuthStore();

  async function onSubmit(values: {
    verifireId: string;
    displayName: string;
    dob: string;
    gender: string;
    bio: string;
  }) {
    const { verifireId, displayName, dob, gender, bio } = values;

    if (user) {
      await updateDoc(doc(db, "users", user.uid), {
        verifireId: verifireId,
        gender: gender,
        dob: dob,
        displayName: displayName,
        bio: bio,
      });
    }
  }

  return (
    <Formik
      initialValues={{
        verifireId: verifireId,
        displayName: displayName,
        dob: dob,
        gender: gender,
        bio: bio,
      }}
      validationSchema={EditProfileValidationSchema}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 500);
        onSubmit(values);
        router.push("/profile");
      }}
    >
      {({ isSubmitting, isValidating, errors, touched }) => (
        <Form className="flex flex-col gap-5">
          <div
            className={`${styles.input_group} group relative ${
              errors.verifireId && touched.verifireId ? "border-rose-600" : ""
            }`}
          >
            <Field
              name="verifireId"
              type="text"
              className={styles.input_text}
              placeholder="VeriFire ID"
            />
          </div>
          <div
            className={`${styles.input_group} group relative ${
              errors.displayName && touched.displayName ? "border-rose-600" : ""
            } `}
          >
            <Field
              name="displayName"
              type="text"
              className={styles.input_text}
              placeholder="Display Name"
            />
          </div>
          <div className="flex flex-row w-full gap-2">
            <div
              className={`${styles.input_group} group relative w-1/2 ${
                errors.dob && touched.dob ? "border-rose-600" : ""
              }`}
            >
              <Field name="dob" type="date" className={styles.input_text} />
            </div>
            <div
              className={`${styles.input_group} group relative w-1/2 ${
                errors.gender && touched.gender ? "border-rose-600" : ""
              }`}
            >
              <Field
                name="gender"
                as="select"
                className={styles.input_text}
                placeholder="Please select your Gender"
              >
                <option value="">Select an option</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="LGBTQ+">LGBTQ+</option>
              </Field>
            </div>
            {/* <ErrorMessage name="gender" component="div" /> */}
          </div>

          <div
            className={`${styles.input_group} group relative h-40 ${
              errors.bio && touched.bio ? "border-rose-600" : ""
            }`}
          >
            <Field
              name="bio"
              type="textarea"
              className={styles.input_text}
              placeholder="About you"
            />
          </div>
          <div className="button">
            <button type="submit" className={`${styles.button}`}>
              Confirm
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
