import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
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

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const phoneValidationSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(phoneRegExp, "Please enter a valid 10-digit phone number")
    .required("Phone number is required"),
});

export const EmergencyContactValidationSchema = Yup.object().shape({
  emergencyContact1: Yup.string()
    .matches(phoneRegExp, "Please enter a valid 10-digit phone number")
    .required("Emergency Contact number is required"),
  relationship1: Yup.string().required("Relationship is required"),
  emergencyContact2: Yup.string()
    .matches(phoneRegExp, "Please enter a valid 10-digit phone number")
    .required("Emergency Contact number is required"),
  relationship2: Yup.string().required("Relationship is required"),
});

export const EditProfileValidationSchema = Yup.object().shape({
  verifireId: Yup.string().required("VeriFire ID is required"),
  displayName: Yup.string()
    .required("Display Name is required")
    .min(2, "Display Name must be at least 2 characters")
    .max(50, "Display Name must be at most 50 characters"),
  dob: Yup.date()
    .max(new Date(), "Date of Birth cannot be in the future")
    .required("Date of Birth is required"),
  gender: Yup.string()
    .oneOf(["Male", "Female", "LGBTQ+"], "Invalid choice")
    .required("Choice is required"),
  bio: Yup.string().max(500, "Description must be at most 500 characters"),
});
