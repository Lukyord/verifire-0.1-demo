declare module "*.module.css";
declare module "*.module.scss";

type NavLinkNotSignedIn =
  | "Home/About"
  | "Sign in"
  | "Sign up"
  | "Feedback"
  | "Contact Us";

type NavLinkSignedIn =
  | "Home/About"
  | "Friends"
  | "Let's Meet"
  | "Profile"
  | "Contact Us";

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
