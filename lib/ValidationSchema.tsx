import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters")
    .required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    .required("Password is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .nullable()
    .required("Confirm password is required"),
});

export const signInValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be less than 20 characters")
    .required("Password is required"),
});

export const feedbackValidationSchema = Yup.object().shape({
  topic: Yup.string()
    .min(2, "Topic must be at least 2 characters")
    .max(50, "Topic must be at most 50 characters")
    .required("Topic is required"),
  comment: Yup.string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters")
    .required("comment is required"),
});