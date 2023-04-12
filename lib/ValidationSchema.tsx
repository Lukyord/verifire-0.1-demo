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

export const LetsMeetValidationSchema = Yup.object().shape({
  place: Yup.string()
    .min(2, "Place name must be at least 2 characters")
    .max(50, "Place name must be at most 50 characters")
    .required("Place name is required"),
  date: Yup.date().required("Date is required"),
  timeFrom: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Time format must be in HH:mm (e.g. 09:00)"
    )
    .required("Time from is required"),
  timeTo: Yup.string()
    .matches(
      /^([01]\d|2[0-3]):([0-5]\d)$/,
      "Time format must be in HH:mm (e.g. 09:00)"
    )
    .required("Time to is required")
    .test("timeTo", "Time to must be later than time from", function (value) {
      const { timeFrom } = this.parent;
      if (!timeFrom || !value) {
        return true; // don't run this test if either field is empty
      }
      const [fromHours, fromMinutes] = timeFrom.split(":");
      const [toHours, toMinutes] = value.split(":");
      const fromTime = new Date(
        0,
        0,
        0,
        parseInt(fromHours),
        parseInt(fromMinutes)
      );
      const toTime = new Date(0, 0, 0, parseInt(toHours), parseInt(toMinutes));
      return toTime > fromTime;
    }),
  about: Yup.string()
    .min(10, "About must be at least 10 characters")
    .max(500, "About must be at most 500 characters")
    .required("About is required"),
});
