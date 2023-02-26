"use client";

interface MyFormValues {
  firstName: string;
}

import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Formik, Field, Form, useFormik } from "formik";
import signInValidate from "../../lib/Validate";
import styles from "../../styles/Form.module.css";

export default function LoginTest() {
  const initialValues: MyFormValues = { firstName: "" };
  const [show, setShow] = useState(false);

  async function onSubmit(values: SignInData) {
    console.log(values);
  }
  return (
    <div>
      <h1>My Example</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          console.log({ values, actions });
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }}
      >
        {({ isValidating, isSubmitting }) => (
          <Form>
            <label htmlFor="firstName">First Name</label>
            <Field id="firstName" name="firstName" placeholder="First Name" />
            <button
              type="submit"
              onClick={() => console.log(isValidating, isSubmitting)}
            >
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
