declare module "*.module.css";
declare module "*.module.scss";

type NavLinkNotSignedIn = "Home/About" | "Sign in" | "Sign up" | "Feedback";

type NavLinkSignedIn =
  | "Home"
  | "Friends"
  | "Let's Meet"
  | "History Meet"
  | "Profile";

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

type User = {
  bio: string;
  email: string;
  displayName: string;
  dob: string;
  gender: string;
  photoURL: string;
  verifireId: string;
  emergencyContacts: EmergencyContact;
  id: string;
  phone: string;
  timestamp: Timestamp;
};

type LetsMeetData = {
  place: string;
  date: string;
  timeFrom: string;
  timeTo: string;
  about: string;
  requestorId: string;
  recieverId: string;
  timeStamp: string;
};
