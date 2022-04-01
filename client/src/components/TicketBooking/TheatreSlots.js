import React, { useContext } from "react";
import TimeSlot from "./TimeSlot";
import styles from "./BookTicket.module.css";

const TheatreSlots = (props) => {
  const timeSlots = (time, index) => {
    if (props.showDetails[0].lang[index] === props.lang)
      return (
        <TimeSlot
          key={Math.round(Math.random() * 100)}
          clickHandler={props.clickHandler}
          time={time}
        />
      );
  };

  return (
    <div className={styles["theatre-details"]}>
      <div>
        <h5>{props.theatreName}</h5>
        <p>{props.theatreAddress}</p>
        <p hidden>{props.theatreId}</p>
      </div>
      <div className={styles["show-details"]}>
        {props.showDetails[0].time.map(timeSlots)}
      </div>
    </div>
  );
};

export default TheatreSlots;
