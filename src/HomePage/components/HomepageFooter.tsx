import Link from "next/link";
import React from "react";

export default function HomepageFooter() {
  return (
    <div className="h-[10rem] bg-purple-200 flex flex-col pl-5 pt-5 ">
      <h1 className="text-2xl font-bold font-helvetica_outline text-purple-600">
        Contact Us
      </h1>
      <Link href="https://www.instagram.com/verifire.th/" className="mt-4 ">
        Instagram
      </Link>
      <Link href="https://en.wikipedia.org/wiki/Next.js">Twitter</Link>
      <Link href="https://en.wikipedia.org/wiki/Next.js">Facebook</Link>
    </div>
  );
}
