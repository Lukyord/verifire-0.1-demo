import nodemailer from "nodemailer";

const email = process.env.NEXT_PUBLIC_EMAIL;
const password = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;

// const email = "verifire.th@gmail.com";
// const password = "xshrgrqidgrvspvl";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass: password,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
