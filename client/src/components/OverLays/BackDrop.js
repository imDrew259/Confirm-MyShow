import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BackDrop.module.css";

const BackDrop = (props) => {
  const navigate = useNavigate();

  let backdropClickHandler;

  if (!("showModal" in props)) {
    backdropClickHandler = (b) => {
      if (!b) navigate(-1);
    };
  } else {
    backdropClickHandler = props.showModal;
  }
  return (
    <div
      className={styles.backdrop}
      onClick={() => backdropClickHandler(false)}
    ></div>
  );
};

export default BackDrop;
