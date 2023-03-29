import Link from "next/link";
import styles from "../../../styles/Popup.module.css";

export default function PopupFriendListOverlay({
  trigger,
  setTrigger,
  children,
}: {
  children: React.ReactNode;
  trigger: boolean;
  setTrigger: (value: boolean) => void;
}) {
  return (
    <>
      {trigger && (
        <div className={styles.popup} onClick={() => setTrigger(false)}>
          <div className={styles.popup_inner_lets_meet}>
            {children}
            {/* <Link href="lets_meet">
              <button
                className={styles.close_btn}
                onClick={() => setTrigger(false)}
              >
                OK
              </button>
            </Link> */}
          </div>
        </div>
      )}
    </>
  );
}
