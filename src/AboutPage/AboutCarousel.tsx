"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import styles from "../../styles/Carousel.module.css";
import AboutPage1 from "./components/AboutPage1";
import AboutPage2 from "./components/AboutPage2";

export default function AboutCarousel() {
  return (
    <div className="w-full h-full bg-red-400">
      <Carousel
        emulateTouch={true}
        showThumbs={false}
        className="w-full h-full my-auto py-auto"
      >
        <div className="h-[45rem] md:h-[38rem] flex items-center justify-center overflow-hidden">
          <AboutPage1 />
        </div>
        <div className="h-full flex items-center justify-center">
          <AboutPage2 />
        </div>
      </Carousel>
    </div>
  );
}
