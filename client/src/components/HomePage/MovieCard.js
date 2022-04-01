import React from "react";
import { Link } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";
import styles from "./MovieCard.module.css";

const MovieCard = (props) => {
  return (
    <ReactBootstrap.Col>
      <Link className={styles["not-link"]} to={`/show-details/${props.id}`}>
        <ReactBootstrap.Card text="light" className={styles.card}>
          <ReactBootstrap.Card.Img
            variant="top"
            src={props.img}
            className={styles.img}
          />
          <ReactBootstrap.Card.Body>
            <ReactBootstrap.Card.Title className={styles.heading}>
              {props.title}
            </ReactBootstrap.Card.Title>
          </ReactBootstrap.Card.Body>
        </ReactBootstrap.Card>
      </Link>
    </ReactBootstrap.Col>
  );
};

export default MovieCard;
