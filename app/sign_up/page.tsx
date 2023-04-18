import SignUpFooter from "../../src/SignUpPage/SignUpFooter";
import SignUpForm from "../../src/SignUpPage/SignUpForm";
import Logo from "../../public/logo/logo.png";
import Image from "next/image";

export default function SignUp() {
  return (
    <section className="w-3/4 mx-auto flex flex-col mt-10 items-center">
      <title>VeriFire - Sign Up</title>
      <div className="text-center mb-16 flex flex-col justify-center items-center">
        <Image src={Logo} alt="VeriFire Logo" width={150} height={150} />
        <h1>Welcome!</h1>
        <p>Create your account here</p>
      </div>
      <div className="flex flex-col gap-2">
        <SignUpForm />
        <SignUpFooter />
      </div>
    </section>
  );
}
