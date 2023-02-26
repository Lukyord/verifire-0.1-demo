import Footer from "../../src/SignUpPage/SignUpFooter";
import SignUpForm from "../../src/SignUpPage/SignUpForm";

export default function SignUp() {
  return (
    <section className="w-3/4 mx-auto flex flex-col gap-10 mt-20">
      <title>VeriFire - Sign Up</title>
      <SignUpForm />
      <Footer />
    </section>
  );
}
