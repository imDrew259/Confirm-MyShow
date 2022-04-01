import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import styles from "./BookTicket.module.css";

const TimeSlot = (props) => {
  const { entity } = useContext(AuthContext);

  return (
    <div
      onClick={entity.scope === "USER" && props.clickHandler}
      className={styles.pointer}
    >
      <span className={styles.time}>{props.time}</span>
    </div>
  );
};

export default TimeSlot;
