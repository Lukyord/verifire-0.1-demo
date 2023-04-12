import styles from "../../../styles/Popup.module.css";

export default function PopupConfirmMeetOverlay({
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
          <div className={styles.popup_inner_lets_meet_confirm}>{children}</div>
        </div>
      )}
    </>
  );
}
