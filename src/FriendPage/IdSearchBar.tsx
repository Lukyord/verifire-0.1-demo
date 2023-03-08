"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import styles from "../../styles/Form.module.css";

export default function IdSearchBar() {
  const onSubmit = async (values: { searchQuery: string }) => {
    const { searchQuery } = values;
    console.log(searchQuery);
  };

  return (
    <>
      <Formik
        initialValues={{ searchQuery: "" }}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        <Form className={`${styles.input_group} relative`}>
          <Field
            type="text"
            name="searchQuery"
            placeholder="Search..."
            className={`${styles.input_text}`}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-4 pl-3 flex items-center"
          >
            <MagnifyingGlassIcon className="w-8 h-8" color="gray" />
          </button>
        </Form>
      </Formik>
    </>
  );
}
