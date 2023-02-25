type NavLinkNotSignedIn =
  | "Home/About"
  | "Login"
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

type LoginData = {
  email: string;
  password: string;
};

type FormErrors = {
  username: string;
  email: string;
  password: string;
  cpassword: string;
};
