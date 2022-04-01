import React, { useState } from "react";
import GetMovies from "./GetMovies";
import styles from "./HomePage.module.css";

const HomePage = (props) => {
  return (
    <div className={styles.container}>
      <GetMovies searchString={props.toBeSearched} />
    </div>
  );
};

export default HomePage;
