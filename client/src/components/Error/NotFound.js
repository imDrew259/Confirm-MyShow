import React from "react";
import styles from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles["error-code"]}>Error: 404</div>
      <div className={styles.error}>Page Not Found</div>
    </div>
  );
};

export default NotFound;
