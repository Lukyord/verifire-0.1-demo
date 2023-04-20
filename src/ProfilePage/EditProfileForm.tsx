"use client";

import styles from "../../styles/Form.module.css";
import stylesPic from "../../styles/Image.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { EditProfileValidationSchema } from "../../lib/ValidationSchema";
import useAuthStore from "../../store/authStore";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import ProfileChanged from "./components/ProfileChanged";
import Image from "next/image";

type FileInputProps = {
  onUpload: (url: string) => void;
};

export default function EditProfileForm({ onUpload }: FileInputProps) {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [progress, setProgress] = useState<number | null>(null);
  const [triggerPopup, setTriggerPopup] = useState(false);
  const { user, id, verifireId, displayName, dob, gender, bio, photoURL } =
    useAuthStore();
  const [uploadedImageURL, setUploadedImageURL] = useState(photoURL);
  const [finishUploading, setFinishUploading] = useState(false);

  useEffect(() => {
    uploadFile();
  }, [imageUpload]);

  async function uploadFile() {
    if (imageUpload == null) return;
    const imagesRef = ref(storage, `profileImages/${id}`);
    const uploadTask = uploadBytesResumable(imagesRef, imageUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        if (progress >= 100) {
          setFinishUploading(true);
        }
      },
      (error) => {
        console.error(error);
      },
      async () => {
        const downloadURL = await getDownloadURL(imagesRef);
        setUploadedImageURL(downloadURL);
        onUpload(downloadURL);
      }
    );
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setImageUpload(event.target.files[0]);
      setFinishUploading(false);
    }
  }

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
        photoURL: uploadedImageURL,
      });
    }
  }

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row items-center justity-start gap-1 md:gap-4 mb-4">
        <Image
          className={`${stylesPic.circular_pic} `}
          src={
            uploadedImageURL === ""
              ? "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              : uploadedImageURL
          }
          unoptimized
          alt="user profile image"
          width={1080}
          height={1080}
        />
        <input type="file" onChange={handleChange} className="my-2 ml-14" />
        <div className="flex flex-col items-center justify-center grow">
          {progress && <progress value={progress} max="100" className="grow" />}
          {finishUploading && <p className="text-center">Photo Updated</p>}
        </div>
      </div>
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
          onSubmit(values).then(() => {
            setTriggerPopup(true);
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="flex flex-col gap-4">
            <div>
              <p className="ml-2 mb-1 text-sm">VeriFire ID</p>
              <div
                className={`${styles.input_group} group relative ${
                  errors.verifireId && touched.verifireId
                    ? "border-rose-600"
                    : ""
                }`}
              >
                <Field
                  name="verifireId"
                  type="text"
                  className={`${styles.input_text}`}
                  placeholder="VeriFire ID"
                />
              </div>
            </div>
            <div>
              <p className="ml-2 mb-1 text-sm">Display Name</p>
              <div
                className={`${styles.input_group} group relative ${
                  errors.displayName && touched.displayName
                    ? "border-rose-600"
                    : ""
                } `}
              >
                <Field
                  name="displayName"
                  type="text"
                  className={styles.input_text}
                  placeholder="Display Name"
                />
              </div>
            </div>
            <div>
              <div className="flex flex-row">
                <p className="ml-2 mb-1 text-sm w-1/2">Date of Birth</p>
                <p className="ml-4 mb-1 text-sm w-1/2">Gender</p>
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
            </div>
            <div>
              <p className="ml-2 mb-1 text-sm">Bio</p>
              <div
                className={`${styles.input_group} group relative h-20 ${
                  errors.bio && touched.bio ? "border-rose-600" : ""
                }`}
              >
                <Field
                  name="bio"
                  as="textarea"
                  className={styles.input_text}
                  placeholder="About you"
                />
              </div>
            </div>
            <div className="button flex justify-center items-center my-10">
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
      <ProfileChanged trigger={triggerPopup} setTrigger={setTriggerPopup}>
        <h1>Changes made</h1>
        <h2>Please refresh page to see the changes</h2>
      </ProfileChanged>
    </div>
  );
}
