import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import * as ReactBootstrap from "react-bootstrap";
import styles from "./GetMovies.module.css";

const GetMovies = (props) => {
  const [isMoviesFetched, setMoviesFetched] = useState({
    getStatus: false,
    message: "Loading Movies...",
    list: null,
  });

  const fetchMovies = async () => {
    const APIKey = process.env.REACT_APP_API_KEY;
    const urlString = props.searchString
      ? `Search/${APIKey}/` + props.searchString
      : `ComingSoon/${APIKey}`;

    const url = "https://imdb-api.com/en/API/" + urlString;

    const response = await fetch(url);

    if (response.status >= 200 && response.status <= 299) {
      return await response.json();
    } else {
      throw new Error(
        "Something went wrong, Unable to Fetch Movies. Please Reload or Contact us. ThankYou"
      );
    }
  };

  const showAsMovieCard = (item) => {
    return (
      <MovieCard
        key={item.id}
        title={item.title}
        img={item.image}
        id={item.id}
        item={item}
      />
    );
  };

  useEffect(() => {
    if (isMoviesFetched.list) {
      setMoviesFetched({
        getStatus: false,
        message: "Loading Movies...",
        list: null,
      });
    }

    const response = fetchMovies();
    response
      .then((data) => {
        const items = !props.searchString ? data.items : data.results;
        setMoviesFetched({
          getStatus: true,
          message: " Movies Loaded",
          list: items,
        });
      })
      .catch((err) => {
        setMoviesFetched({
          getStatus: false,
          message: err.message,
          list: null,
        });
      });
  }, [props]);
  return (
    <div className={styles["movies-container"]}>
      {isMoviesFetched.list ? (
        <ReactBootstrap.Row xs={2} sm={3} md={4} lg={6} className="g-4">
          {isMoviesFetched.list.map(showAsMovieCard)}
        </ReactBootstrap.Row>
      ) : (
        <ReactBootstrap.Spinner animation="border" variant="secondary" />
      )}
    </div>
  );
};

export default GetMovies;
