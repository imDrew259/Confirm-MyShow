import React from "react";
import styles from "./SeatModal.module.css";

const MessageOverlay = (props) => {
  return (
    <div className={`${styles.modal} ${styles.fmodal}`}>
      <div className={styles.message}>
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default MessageOverlay;
