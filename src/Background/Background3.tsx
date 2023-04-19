import styles from "../../styles/Animation.module.css";
export default function Background3() {
  return (
    <div className="-z-10 fixed top-0 left-0 w-full h-full overflow-y-hidden overflow-x-hidden">
      <div className={`top-0 -left-4 bg-purple-600 ${styles.animation}`}></div>
      <div
        className={`top-0 -right-4 bg-purple-700 ${styles.animation_delay_2000} animation-delay-2000`}
      ></div>
      <div
        className={`top-64 right-20 bg-fuchsia-800 ${styles.animation}`}
      ></div>
      <div
        className={`bottom-40 left-40  bg-fuchsia-600 ${styles.animation_delay_4000} animation-delay-4000`}
      ></div>
      <div
        className={`-bottom-8 left-20 bg-purple-700 ${styles.animation_delay_2000} animation-delay-2000  `}
      ></div>
      <div
        className={`-bottom-20 right-40 bg-fuchsia-500 ${styles.animation}`}
      ></div>
    </div>
  );
}
