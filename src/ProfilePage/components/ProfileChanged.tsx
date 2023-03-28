import Link from "next/link";
import styles from "../../../styles/Popup.module.css";

export default function ProfileChanged({
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
          <div className={styles.popup_inner_large}>
            {children}
            <Link href="profile">
              <button
                className={styles.close_btn}
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
