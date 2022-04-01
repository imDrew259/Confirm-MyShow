import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./SeatModal.module.css";
import image from "../../assets/modal-image.jpg";

const SeatModal = (props) => {
  const [seats, setSeats] = useState({
    Executive: 0,
    Premium: 0,
  });
  const clickHandler = (ev) => {
    const tos = ev.target.getAttribute("id");
    if (tos.substring(0, 1) === "E") {
      setSeats((prev) => {
        return {
          ...prev,
          Executive: tos,
        };
      });
    } else {
      setSeats((prev) => {
        return {
          ...prev,
          Premium: tos,
        };
      });
    }
  };
  return (
    <div className={styles.modal}>
      <h2>How Many Seats?</h2>
      <div>
        <img className={styles["modal-image"]} src={image} />
      </div>
      <div>
        <h4>Executive</h4>
        <p className={styles.price}> Rs 130</p>
      </div>
      <div className={styles["seat-selection"]}>
        <div
          id="E1"
          className={`${styles.seats} ${
            seats.Executive === "E1" && styles.active
          }`}
          onClick={clickHandler}
        >
          1
        </div>
        <div
          id="E2"
          className={`${styles.seats} ${
            seats.Executive === "E2" && styles.active
          }`}
          onClick={clickHandler}
        >
          2
        </div>
        <div
          id="E3"
          className={`${styles.seats} ${
            seats.Executive === "E3" && styles.active
          }`}
          onClick={clickHandler}
        >
          3
        </div>
        <div
          id="E4"
          className={`${styles.seats} ${
            seats.Executive === "E4" && styles.active
          }`}
          onClick={clickHandler}
        >
          4
        </div>
        <div
          id="E5"
          className={`${styles.seats} ${
            seats.Executive === "E5" && styles.active
          }`}
          onClick={clickHandler}
        >
          5
        </div>
        <div
          id="E6"
          className={`${styles.seats} ${
            seats.Executive === "E6" && styles.active
          }`}
          onClick={clickHandler}
        >
          6
        </div>
      </div>

      <div>
        <h4>Premium</h4>
        <p className={styles.price}> Rs 300</p>
      </div>
      <div className={styles["seat-selection"]}>
        <div
          id="P1"
          className={`${styles.seats} ${
            seats.Premium === "P1" && styles.active
          }`}
          onClick={clickHandler}
        >
          1
        </div>
        <div
          id="P2"
          className={`${styles.seats} ${
            seats.Premium === "P2" && styles.active
          }`}
          onClick={clickHandler}
        >
          2
        </div>
        <div
          id="P3"
          className={`${styles.seats} ${
            seats.Premium === "P3" && styles.active
          }`}
          onClick={clickHandler}
        >
          3
        </div>
        <div
          id="P4"
          className={`${styles.seats} ${
            seats.Premium === "P4" && styles.active
          }`}
          onClick={clickHandler}
        >
          4
        </div>
        <div
          id="P5"
          className={`${styles.seats} ${
            seats.Premium === "P5" && styles.active
          }`}
          onClick={clickHandler}
        >
          5
        </div>
        <div
          id="P6"
          className={`${styles.seats} ${
            seats.Premium === "P6" && styles.active
          }`}
          onClick={clickHandler}
        >
          6
        </div>
      </div>
      <Link
        className={styles.button}
        to={`/theatre-seats/${seats.Executive}/${seats.Premium}`}
        state={props.state}
      >
        <div className={styles["submit-seat-button"]}>Select Seats</div>
      </Link>
    </div>
  );
};

export default SeatModal;
