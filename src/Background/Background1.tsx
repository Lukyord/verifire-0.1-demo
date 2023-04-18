import styles from "../../styles/Animation.module.css";
export default function Background1() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-y-hidden overflow-x-hidden">
      <div
        className={`top-0 -left-4 w-96 h-96 bg-purple-300 ${styles.animation}`}
      ></div>
      <div
        className={`top-0 -right-4 w-72 h-72 bg-purple-600 ${styles.animation_delay_2000} animation-delay-2000`}
      ></div>
      <div
        className={`top-64 right-20 w-72 h-72 bg-fuchsia-700 ${styles.animation}`}
      ></div>
      <div
        className={`bottom-40 left-40 w-72 h-72 bg-fuchsia-400 ${styles.animation_delay_4000} animation-delay-4000`}
      ></div>
      <div
        className={`-bottom-8 left-20 w-72 h-72 bg-purple-700 ${styles.animation_delay_2000} animation-delay-2000  `}
      ></div>
      <div
        className={`-bottom-20 right-40 w-72 h-72 bg-fuchsia-300 ${styles.animation}`}
      ></div>
    </div>
  );
}
