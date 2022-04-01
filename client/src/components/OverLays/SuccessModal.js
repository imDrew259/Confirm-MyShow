import React from "react";
import styles from "./SeatModal.module.css";
import image from "../../assets/modal-image.jpg";

const SuccessModal = (props) => {
  return (
    <div className={`${styles.modal} ${styles.fmodal}`}>
      <h2>Get Your Auto Ready😉</h2>
      <div>
        <img className={styles["modal-image"]} src={image} />
      </div>
      <div>
        <h4>Your ticket has been booked ✔</h4>
      </div>
    </div>
  );
};

export default SuccessModal;
