import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  Fragment,
} from "react";
import { createPortal } from "react-dom";
import * as ReactBootstrap from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchDataThroughId } from "./FetchData.js";
import AuthContext from "../../store/auth-context";
import TheatreSlots from "./TheatreSlots";
import styles from "./BookTicket.module.css";
import BackDrop from "../OverLays/BackDrop";
import SeatModal from "../OverLays/SeatModal";
import Date from "../../Date.js";

const BookTicket = () => {
  const params = useParams();
  const { entity } = useContext(AuthContext);
  const navigate = useNavigate();

  const [fetchedData, setFetchedData] = useState(null);
  const [peopleSelectingModal, setPeopleSelectingModal] = useState(false);
  const [theatreData, setTheatreData] = useState(null);
  const [focussedDT, setFocussedDT] = useState({
    focussedDate: Date.today.toISOString().split("T")[0],
    focussedLang: null,
  });

  const propsObject = useRef({
    movieId: null,
    movieName: null,
    theatreId: null,
    theatreName: null,
    theatreAddress: null,
    date: null,
    time: null,
    lang: null,
  });

  const clickHandler = (event) => {
    const theatreDetails =
      event.target.parentElement.parentElement.previousSibling;
    propsObject.current.lang = focussedDT.focussedLang;
    propsObject.current.date = focussedDT.focussedDate;
    propsObject.current.time = event.target.innerHTML;
    propsObject.current.theatreName = theatreDetails.children[0].innerHTML;
    propsObject.current.theatreAddress = theatreDetails.children[1].innerHTML;
    propsObject.current.theatreId = theatreDetails.children[2].innerHTML;
    setPeopleSelectingModal(true);
  };

  const dtHandler = (ev) => {
    ev.preventDefault();
    const d = ev.target.getAttribute("data");
    if (!d) {
      setFocussedDT((prev) => {
        return {
          ...prev,
          focussedLang: ev.target.value,
        };
      });
    } else {
      let dt;
      if (d === "tod") dt = Date.today;
      else if (d === "tom") dt = Date.tom;
      else if (d === "dat") dt = Date.DAT;
      else if (d === "daat") dt = Date.DAAT;
      setFocussedDT((prev) => {
        return {
          ...prev,
          focussedDate: dt.toISOString().split("T")[0],
        };
      });
    }
  };

  const theatreSlots = (dataObj) => {
    const newShowDetails = dataObj.showDetails.filter((dataItem) => {
      return dataItem.date === focussedDT.focussedDate;
    });
    if (newShowDetails.length !== 0)
      return (
        <TheatreSlots
          key={Math.round(Math.random() * 100)}
          id={theatreData._id}
          theatreId={dataObj.theatreId._id}
          theatreName={dataObj.theatreId.name}
          theatreAddress={dataObj.theatreId.address}
          showDetails={newShowDetails}
          lang={focussedDT.focussedLang}
          clickHandler={clickHandler}
        />
      );
  };

  const fetchShowDetails = (id) => {
    const url = "http://localhost:8080/get-theatre/" + `${id}`;

    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + entity.token,
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json();
        } else {
          return res.json().then((result) => {
            if ("errors" in result) {
              const { errors } = result;
              throw new Error(errors[0].msg);
            }
          });
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  useEffect(() => {
    const response = fetchDataThroughId(params.showId);
    const movieDetails = fetchShowDetails(params.showId);
    response
      .then((data) => {
        propsObject.current.movieId = data.id;
        propsObject.current.movieName = data.fullTitle;
        setFetchedData(data);
      })
      .catch((err) => {
        console.log(err);
      });
    movieDetails
      .then((data) => {
        setTheatreData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.showId]);

  return (
    <Fragment>
      {fetchedData && theatreData ? (
        <Fragment>
          <div className={styles.container}>
            <h1 className={styles.heading}>{fetchedData.fullTitle}</h1>
            <div className={styles["genres-container"]}>
              {fetchedData.genreList.map((genre) => (
                <span key={genre.key} className={styles.genre}>
                  {genre.key}
                </span>
              ))}
            </div>
            <p className={styles.parah}>Runtime: {fetchedData.runtimeStr}</p>
            <p className={styles.parah}>
              Release Date: {fetchedData.releaseDate}
            </p>
          </div>
          <div className={styles["sub-container"]}>
            <div className={styles["date-container"]}>
              <div
                data="tod"
                className={`${styles["date-items-container"]} ${
                  focussedDT.focussedDate ===
                    Date.today.toISOString().split("T")[0] &&
                  styles["active-date"]
                }`}
                onClick={dtHandler}
              >
                <p className={styles["date-item"]}>{Date.today.getDate()}</p>
                <p className={styles["date-item"]}>Today</p>
              </div>
              <div
                data="tom"
                className={`${styles["date-items-container"]} ${
                  focussedDT.focussedDate ===
                    Date.tom.toISOString().split("T")[0] &&
                  styles["active-date"]
                }`}
                onClick={dtHandler}
              >
                <p className={styles["date-item"]}>{Date.tom.getDate()}</p>
                <p className={styles["date-item"]}>{Date.tomD}</p>
              </div>
              <div
                data="dat"
                className={`${styles["date-items-container"]} ${
                  focussedDT.focussedDate ===
                    Date.DAT.toISOString().split("T")[0] &&
                  styles["active-date"]
                }`}
                onClick={dtHandler}
              >
                <p className={styles["date-item"]}>{Date.DAT.getDate()}</p>
                <p className={styles["date-item"]}>{Date.DATD}</p>
              </div>
              <div
                data="daat"
                className={`${styles["date-items-container"]} ${
                  focussedDT.focussedDate ===
                    Date.DAAT.toISOString().split("T")[0] &&
                  styles["active-date"]
                }`}
                onClick={dtHandler}
              >
                <p className={styles["date-item"]}>{Date.DAAT.getDate()}</p>
                <p className={styles["date-item"]}>{Date.DAATD}</p>
              </div>
            </div>
            <ReactBootstrap.Form.Select
              aria-label="Default select example"
              className={styles["option-block"]}
              onChange={dtHandler}
              name="lang"
            >
              <option className={styles["select-option"]}>
                Select Language
              </option>
              <option value="1" className={styles["select-option"]}>
                Hindi-3D
              </option>
              <option value="2" className={styles["select-option"]}>
                English-3D
              </option>
              <option value="3" className={styles["select-option"]}>
                Hindi-2D
              </option>
              <option value="4" className={styles["select-option"]}>
                English-2D
              </option>
            </ReactBootstrap.Form.Select>
          </div>
          <div className={styles["theatre-container"]}>
            {theatreData.data &&
              focussedDT.focussedLang &&
              theatreData.data.map(theatreSlots)}
          </div>
          {entity.scope === "THEATRE" && (
            <ReactBootstrap.Button
              variant="secondary"
              className={styles.home}
              type="button"
              onClick={() => {
                navigate("/");
              }}
            >
              Home Page
            </ReactBootstrap.Button>
          )}
        </Fragment>
      ) : (
        <ReactBootstrap.Spinner
          className={styles.spinner}
          animation="border"
          variant="secondary"
        />
      )}
      {peopleSelectingModal &&
        createPortal(
          <Fragment>
            <BackDrop showModal={(bool) => setPeopleSelectingModal(bool)} />
            <SeatModal state={propsObject.current} />
          </Fragment>,
          document.getElementById("overlay-root")
        )}
    </Fragment>
  );
};

export default BookTicket;
