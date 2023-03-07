declare module "*.module.css";
declare module "*.module.scss";

type NavLinkNotSignedIn = "Home/About" | "Sign in" | "Sign up" | "Feedback";

type NavLinkSignedIn =
  | "Home/About"
  | "Friends"
  | "Let's Meet"
  | "Profile"
  | "Sign out";

type SignUpData = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};

type SignInData = {
  email: string;
  password: string;
};

type FeedbackData = {
  topic: string;
  comment: string;
};

type EmergencyContact = {
  emergencyContact1: string;
  relationship1: string;
  emergencyContact2: string;
  relationship2: string;
};

type UserData = {
  bio: string;
  displayName: string;
  dob: string;
  gender: string;
  photoURL: string;
  verifireId: string;
};
