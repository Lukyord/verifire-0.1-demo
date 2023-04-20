import styles from "../../styles/Animation.module.css";
export default function Background1() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-hidden overflow-x-hidden">
      <div className={`top-0 -left-4 bg-purple-200 ${styles.animation}`}></div>
      <div
        className={`top-0 -right-4 bg-purple-500 ${styles.animation_delay_2000}`}
      ></div>
      <div
        className={`top-64 right-20 bg-fuchsia-600 ${styles.animation}`}
      ></div>
      <div
        className={`bottom-40 left-40  bg-fuchsia-300 ${styles.animation_delay_4000}`}
      ></div>
      <div
        className={`-bottom-8 left-20 bg-purple-600 ${styles.animation_delay_2000}`}
      ></div>
      <div
        className={`-bottom-20 right-40 bg-fuchsia-200 ${styles.animation}`}
      ></div>
    </div>
  );
}
