"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/Form.module.css";
import getUserByVeriFireId from "../../lib/getUserByVeriFireId";
import { DocumentData } from "firebase/firestore";

export default function IdSearchBar() {
  const [user, setUser] = useState<DocumentData | null | undefined>();

  const onSubmit = async (values: { searchQuery: string }) => {
    const { searchQuery } = values;
    const searchedUser = await getUserByVeriFireId(searchQuery);

    if (searchedUser !== null) {
      setUser(searchedUser);
    } else {
      setUser(null);
    }
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
      {user !== null && user !== undefined && (
        <div>
          <p>{user.displayName}</p>
        </div>
      )}
      {user === null && (
        <div>
          <p>not found</p>
        </div>
      )}
    </>
  );
}
