import React, { useState, useEffect, useContext, Fragment } from "react";
import * as ReactBootstrap from "react-bootstrap";
import { Link, useParams } from "react-router-dom";

import { fetchDataThroughId } from "./FetchData.js";
import AuthContext from "../../store/auth-context";
import styles from "./MovieDetails.module.css";

const MovieDetails = () => {
  const params = useParams();
  const { entity } = useContext(AuthContext);
  const [fetchedData, setFetchedData] = useState(null);

  useEffect(() => {
    const response = fetchDataThroughId(params.showId);
    response
      .then((data) => {
        setFetchedData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.showId]);

  return (
    <Fragment>
      {fetchedData ? (
        <ReactBootstrap.Container fluid>
          <ReactBootstrap.Row className={styles.container}>
            <ReactBootstrap.Col className={styles.col} lg={3} md={4} sm={6}>
              <img
                src={fetchedData.image}
                alt={fetchedData.title}
                className={styles.img}
              />
            </ReactBootstrap.Col>
            <ReactBootstrap.Col
              className={`${styles["movie-info"]}`}
              lg={5}
              md={6}
              sm={6}
            >
              <div className={styles.heading}>{fetchedData.fullTitle}</div>
              <div>
                <p className={styles.parah}> {fetchedData.genres} </p>
                <p className={styles.parah}>
                  Runtime: {fetchedData.runtimeStr}
                </p>
                <p className={styles.parah}>
                  Release Date: {fetchedData.releaseDate}
                </p>
              </div>

              <button type="button" className={styles.button}>
                <Link
                  to={
                    entity.scope === "USER"
                      ? `/book-ticket/${params.showId}`
                      : `/post-theatre/${params.showId}/${fetchedData.title}`
                  }
                  className={styles["link-button"]}
                >
                  {entity.scope === "USER" ? "Book Ticket" : "Add Show"}
                </Link>
              </button>
            </ReactBootstrap.Col>
          </ReactBootstrap.Row>
          <ReactBootstrap.Row className={styles.container}>
            <div className={styles["plot-heading"]}>About The Show</div>
            <div className={styles.plot}>{fetchedData.plot}</div>
          </ReactBootstrap.Row>
        </ReactBootstrap.Container>
      ) : (
        <ReactBootstrap.Spinner
          className={styles.spinner}
          animation="border"
          variant="secondary"
        />
      )}
    </Fragment>
  );
};

export default MovieDetails;
