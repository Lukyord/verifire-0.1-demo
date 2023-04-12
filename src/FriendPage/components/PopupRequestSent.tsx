import Link from "next/link";
import styles from "../../../styles/Popup.module.css";

export default function PopupRequestSent({
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
        <div className={styles.popup}>
          <div className={styles.popup_inner}>
            {children}
            <Link href="friends">
              <button
                className={styles.popup_ok_button}
                onClick={() => setTrigger(false)}
              >
                OK
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
