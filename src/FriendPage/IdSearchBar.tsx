"use client";

import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import styles from "../../styles/Form.module.css";
import getUserByVeriFireId from "../../lib/getUserByVeriFireId";

export default function IdSearchBar() {
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);

  const onSubmit = async (values: { searchQuery: string }) => {
    const { searchQuery } = values;
    setSearch(searchQuery);
    console.log(searchQuery);
    const user = await getUserByVeriFireId(search);

    if (user) {
      console.log(user);
    } else {
      console.log("not found");
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
      {search !== "" && (
        <div>
          <p>search not empty</p>
        </div>
      )}
    </>
  );
}
