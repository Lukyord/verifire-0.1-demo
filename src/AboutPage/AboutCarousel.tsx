"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { items } from "../../public/items.json";
import styles from "../../styles/Carousel.module.css";
import AboutPage1 from "./components/AboutPage1";
import AboutPage2 from "./components/AboutPage2";

export default function AboutCarousel() {
  const { responsive } = items;
  return (
    <div className="w-full h-full bg-red-400">
      <Carousel emulateTouch={true} className="w-full h-full my-auto py-auto">
        <div className="h-[45rem] md:h-[38rem] flex items-center justify-center overflow-hidden">
          <AboutPage1 />
        </div>
        <div className="h-full flex items-center justify-center">
          <AboutPage2 />
        </div>
      </Carousel>
    </div>

    // <Carousel
    //   showArrows={true}
    //   showIndicators={false}
    //   infiniteLoop={false}
    //   emulateTouch={true}
    //   dynamicHeight={true}
    //   className={styles.mySwiper}
    // >
    //   {responsive.map((item) => (
    //     <div key={item.id} className={styles.swipItem}>
    //       {item.id === 1 && <AboutPage1 />}
    //       {item.id === 2 && <AboutPage2 />}
    //     </div>
    //   ))}
    // </Carousel>
  );
}
