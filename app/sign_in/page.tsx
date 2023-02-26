import SignInFooter from "../../src/SignInPage/SignInFooter";
import SignInForm from "../../src/SignInPage/SignInForm";
import LoginTest from "../../src/SignInPage/LoginTest";

export default function SignIn() {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
      <title>VeriFire - Sign In</title>
      <SignInForm />
      <SignInFooter />
      {/* <LoginTest /> */}
    </section>
  );
}
