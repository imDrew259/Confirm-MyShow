import React, { useRef, useState, useContext, Fragment } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import * as ReactBootstrap from "react-bootstrap";

import AuthContext from "../../store/auth-context";
import Date from "../../Date";
import { IoMdAddCircle } from "react-icons/io";
import { IoMdRemoveCircleOutline } from "react-icons/io";
import styles from "./TheatreAddShow.module.css";

const TheatreAddShow = () => {
  const params = useParams();
  const showId = params.showId;
  const showName = params.showName;
  const { entity } = useContext(AuthContext);
  const theatreRef = useRef();

  const [showBookingInput, setShowBookingInput] = useState({
    show2: false,
    show3: false,
    show4: false,
  });

  const navigate = useNavigate();

  const minDate = (date) => date.toISOString().split("T")[0];

  const maxDate = Date.DAAT.toISOString().split("T")[0];

  const resetValues = () => {
    document.getElementById("theatre_form").reset();
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const showBooking = [];
    for (let i = 1; i <= 4; i++) {
      let date = "date" + i;
      if (
        theatreRef.current[`${date}`] &&
        theatreRef.current[`${date}`].value !== ""
      ) {
        showBooking[i - 1] = { date: theatreRef.current[`${date}`].value };
        for (let j = 1; j <= 4; j++) {
          const time = "time" + i + j;
          const lang = "lang" + i + j;
          if (theatreRef.current[`${time}`].value !== "") {
            let timeArray = [];
            let langArray = [];
            let singleTime = theatreRef.current[`${time}`].value;
            let singleLang = theatreRef.current[`${lang}`].value;
            if (showBooking[i - 1].time) {
              timeArray = showBooking[i - 1].time;
              langArray = showBooking[i - 1].lang;
            }
            timeArray.push(singleTime);
            langArray.push(singleLang);
            showBooking[i - 1] = {
              ...showBooking[i - 1],
              time: timeArray,
              lang: langArray,
            };
          }
        }
      }
    }
    fetch("http://localhost:8080/post-theatre", {
      method: "PUT",
      body: JSON.stringify({
        showId: showId,
        showDetails: showBooking,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + entity.token,
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          resetValues();
          navigate(`/book-ticket/${showId}`, { replace: true });
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

  return (
    <div className={styles["form-container"]}>
      <div className={styles["form-control"]}>
        <div className={styles.header}>UserName</div>
      </div>
      <form id="theatre_form" ref={theatreRef} onSubmit={submitHandler}>
        <div className={styles["input-container"]}>
          <label htmlFor="showName">Show Name:</label>
          <input
            type="text"
            id="showName"
            name="name"
            value={showName}
            className={styles.input}
            disabled={true}
          />
        </div>

        <div className={styles["input-container"]}>
          <label htmlFor="date1">Booking Date 1:</label>
          <input
            type="date"
            name="date1"
            id="date1"
            min={minDate(Date.today)}
            max={maxDate}
            className={styles.input}
            // onBlur={(event) => setMinDate(event.target.value)}
            required={true}
          />
          <div className={styles["time-container"]}>
            <div className={styles["time-lang"]}>
              <input
                type="time"
                name="time11"
                min="06:00"
                max="22:00"
                className={styles.time}
                required={true}
              />
              <ReactBootstrap.Form.Select
                aria-label="Default select example"
                className={styles["option-block"]}
                name="lang11"
              >
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

            <div className={styles["time-lang"]}>
              <input
                type="time"
                name="time12"
                min="06:00"
                max="22:00"
                className={styles.time}
              />
              <ReactBootstrap.Form.Select
                aria-label="Default select example"
                className={styles["option-block"]}
                name="lang12"
              >
                <option value="1" className={styles["select-option"]}>
                  Hindi-3D
                </option>
                <option value="2" className={styles["select-option"]}>
                  English-3D
                </option>
                <option value="3" className={styles["select-option"]}>
                  Hindi-2D
                </option>
                <option value="3" className={styles["select-option"]}>
                  English-2D
                </option>
              </ReactBootstrap.Form.Select>
            </div>
            <div className={styles["time-lang"]}>
              <input
                type="time"
                name="time13"
                min="06:00"
                max="22:00"
                className={styles.time}
              />
              <ReactBootstrap.Form.Select
                aria-label="Default select example"
                className={styles["option-block"]}
                name="lang13"
              >
                <option value="1" className={styles["select-option"]}>
                  Hindi-3D
                </option>
                <option value="2" className={styles["select-option"]}>
                  English-3D
                </option>
                <option value="3" className={styles["select-option"]}>
                  Hindi-2D
                </option>
                <option value="3" className={styles["select-option"]}>
                  English-2D
                </option>
              </ReactBootstrap.Form.Select>
            </div>
            <div className={styles["time-lang"]}>
              <input
                type="time"
                name="time14"
                min="06:00"
                max="22:00"
                className={styles.time}
              />
              <ReactBootstrap.Form.Select
                aria-label="Default select example"
                className={styles["option-block"]}
                name="lang14"
              >
                <option value="1" className={styles["select-option"]}>
                  Hindi-3D
                </option>
                <option value="2" className={styles["select-option"]}>
                  English-3D
                </option>
                <option value="3" className={styles["select-option"]}>
                  Hindi-2D
                </option>
                <option value="3" className={styles["select-option"]}>
                  English-2D
                </option>
              </ReactBootstrap.Form.Select>
            </div>
          </div>
        </div>
        {!showBookingInput.show2 ? (
          <div
            className={styles.add}
            onClick={() =>
              setShowBookingInput((prev) => {
                return { ...prev, show2: true };
              })
            }
          >
            <IconContext.Provider
              value={{
                size: "1.5rem",
              }}
            >
              <IoMdAddCircle className={styles.icon} />
            </IconContext.Provider>
          </div>
        ) : (
          <div className={styles["input-container"]}>
            <div className={styles["icon-label-block"]}>
              <label
                className={`${styles["icon-label-block"]} ${styles.label}`}
                htmlFor="date2"
              >
                Booking Date 2:
              </label>
              {!showBookingInput.show3 && !showBookingInput.show4 && (
                <IconContext.Provider
                  value={{
                    size: "1.5rem",
                  }}
                >
                  <IoMdRemoveCircleOutline
                    className={styles.icon}
                    onClick={() =>
                      setShowBookingInput({
                        show2: false,
                        show3: false,
                        show4: false,
                      })
                    }
                  />
                </IconContext.Provider>
              )}
            </div>
            <input
              type="date"
              name="date2"
              id="date2"
              min={minDate(Date.tom)}
              max={maxDate}
              className={styles.input}
              required={true}
            />
            <div className={styles["time-container"]}>
              <div className={styles["time-lang"]}>
                <input
                  type="time"
                  name="time21"
                  min="06:00"
                  max="22:00"
                  className={styles.time}
                  required={true}
                />
                <ReactBootstrap.Form.Select
                  aria-label="Default select example"
                  className={styles["option-block"]}
                  name="lang21"
                >
                  <option value="1" className={styles["select-option"]}>
                    Hindi-3D
                  </option>
                  <option value="2" className={styles["select-option"]}>
                    English-3D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    Hindi-2D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    English-2D
                  </option>
                </ReactBootstrap.Form.Select>
              </div>
              <div className={styles["time-lang"]}>
                <input
                  type="time"
                  name="time22"
                  min="06:00"
                  max="22:00"
                  className={styles.time}
                />
                <ReactBootstrap.Form.Select
                  aria-label="Default select example"
                  className={styles["option-block"]}
                  name="lang22"
                >
                  <option value="1" className={styles["select-option"]}>
                    Hindi-3D
                  </option>
                  <option value="2" className={styles["select-option"]}>
                    English-3D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    Hindi-2D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    English-2D
                  </option>
                </ReactBootstrap.Form.Select>
              </div>
              <div className={styles["time-lang"]}>
                <input
                  type="time"
                  name="time23"
                  min="06:00"
                  max="22:00"
                  className={styles.time}
                />
                <ReactBootstrap.Form.Select
                  aria-label="Default select example"
                  className={styles["option-block"]}
                  name="lang23"
                >
                  <option value="1" className={styles["select-option"]}>
                    Hindi-3D
                  </option>
                  <option value="2" className={styles["select-option"]}>
                    English-3D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    Hindi-2D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    English-2D
                  </option>
                </ReactBootstrap.Form.Select>
              </div>
              <div className={styles["time-lang"]}>
                <input
                  type="time"
                  name="time24"
                  min="06:00"
                  max="22:00"
                  className={styles.time}
                />
                <ReactBootstrap.Form.Select
                  aria-label="Default select example"
                  className={styles["option-block"]}
                  name="lang24"
                >
                  <option value="1" className={styles["select-option"]}>
                    Hindi-3D
                  </option>
                  <option value="2" className={styles["select-option"]}>
                    English-3D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    Hindi-2D
                  </option>
                  <option value="3" className={styles["select-option"]}>
                    English-2D
                  </option>
                </ReactBootstrap.Form.Select>
              </div>
            </div>
          </div>
        )}
        {showBookingInput.show2 ? (
          !showBookingInput.show3 ? (
            <div
              className={styles.add}
              onClick={() =>
                setShowBookingInput((prev) => {
                  return { ...prev, show3: true };
                })
              }
            >
              <IconContext.Provider
                value={{
                  size: "1.5rem",
                }}
              >
                <IoMdAddCircle className={styles.icon} />
              </IconContext.Provider>
            </div>
          ) : (
            <div className={styles["input-container"]}>
              <div className={styles["icon-label-block"]}>
                <label className={styles.label} htmlFor="date3">
                  Booking Date 3:
                </label>
                {!showBookingInput.show4 && (
                  <IconContext.Provider
                    value={{
                      size: "1.5rem",
                    }}
                  >
                    <IoMdRemoveCircleOutline
                      className={styles.icon}
                      onClick={() =>
                        setShowBookingInput({
                          show2: true,
                          show3: false,
                          show4: false,
                        })
                      }
                    />
                  </IconContext.Provider>
                )}
              </div>
              <input
                type="date"
                name="date3"
                id="date3"
                min={minDate(Date.DAT)}
                max={maxDate}
                className={styles.input}
                required={true}
              />
              <div className={styles["time-container"]}>
                <div className={styles["time-lang"]}>
                  <input
                    type="time"
                    name="time31"
                    min="06:00"
                    max="22:00"
                    className={styles.time}
                    required={true}
                  />
                  <ReactBootstrap.Form.Select
                    aria-label="Default select example"
                    className={styles["option-block"]}
                    name="lang31"
                  >
                    <option value="1" className={styles["select-option"]}>
                      Hindi-3D
                    </option>
                    <option value="2" className={styles["select-option"]}>
                      English-3D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      Hindi-2D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      English-2D
                    </option>
                  </ReactBootstrap.Form.Select>
                </div>
                <div className={styles["time-lang"]}>
                  <input
                    type="time"
                    name="time32"
                    min="06:00"
                    max="22:00"
                    className={styles.time}
                  />
                  <ReactBootstrap.Form.Select
                    aria-label="Default select example"
                    className={styles["option-block"]}
                    name="lang32"
                  >
                    <option value="1" className={styles["select-option"]}>
                      Hindi-3D
                    </option>
                    <option value="2" className={styles["select-option"]}>
                      English-3D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      Hindi-2D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      English-2D
                    </option>
                  </ReactBootstrap.Form.Select>
                </div>
                <div className={styles["time-lang"]}>
                  <input
                    type="time"
                    name="time33"
                    min="06:00"
                    max="22:00"
                    className={styles.time}
                  />
                  <ReactBootstrap.Form.Select
                    aria-label="Default select example"
                    className={styles["option-block"]}
                    name="lang33"
                  >
                    <option value="1" className={styles["select-option"]}>
                      Hindi-3D
                    </option>
                    <option value="2" className={styles["select-option"]}>
                      English-3D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      Hindi-2D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      English-2D
                    </option>
                  </ReactBootstrap.Form.Select>
                </div>
                <div className={styles["time-lang"]}>
                  <input
                    type="time"
                    name="time34"
                    min="06:00"
                    max="22:00"
                    className={styles.time}
                  />
                  <ReactBootstrap.Form.Select
                    aria-label="Default select example"
                    className={styles["option-block"]}
                    name="lang34"
                  >
                    <option value="1" className={styles["select-option"]}>
                      Hindi-3D
                    </option>
                    <option value="2" className={styles["select-option"]}>
                      English-3D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      Hindi-2D
                    </option>
                    <option value="3" className={styles["select-option"]}>
                      English-2D
                    </option>
                  </ReactBootstrap.Form.Select>
                </div>
              </div>
            </div>
          )
        ) : null}
        {showBookingInput.show2 ? (
          showBookingInput.show3 ? (
            !showBookingInput.show4 ? (
              <div
                className={styles.add}
                onClick={() =>
                  setShowBookingInput((prev) => {
                    return { ...prev, show4: true };
                  })
                }
              >
                <IconContext.Provider
                  value={{
                    size: "1.5rem",
                  }}
                >
                  <IoMdAddCircle className={styles.icon} />
                </IconContext.Provider>
              </div>
            ) : (
              <div className={styles["input-container"]}>
                <div className={styles["icon-label-block"]}>
                  <label className={styles.label} htmlFor="date4">
                    Booking Date 4:
                  </label>
                  <IconContext.Provider
                    value={{
                      size: "1.5rem",
                    }}
                  >
                    <IoMdRemoveCircleOutline
                      className={styles.icon}
                      onClick={() =>
                        setShowBookingInput({
                          show2: true,
                          show3: true,
                          show4: false,
                        })
                      }
                    />
                  </IconContext.Provider>
                </div>
                <input
                  type="date"
                  name="date4"
                  id="date4"
                  min={minDate(Date.DAAT)}
                  max={maxDate}
                  className={styles.input}
                  required={true}
                />
                <div className={styles["time-container"]}>
                  <div className={styles["time-lang"]}>
                    <input
                      type="time"
                      name="time41"
                      min="06:00"
                      max="22:00"
                      className={styles.time}
                      required={true}
                    />
                    <ReactBootstrap.Form.Select
                      aria-label="Default select example"
                      className={styles["option-block"]}
                      name="lang41"
                    >
                      <option value="1" className={styles["select-option"]}>
                        Hindi-3D
                      </option>
                      <option value="2" className={styles["select-option"]}>
                        English-3D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        Hindi-2D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        English-2D
                      </option>
                    </ReactBootstrap.Form.Select>
                  </div>
                  <div className={styles["time-lang"]}>
                    <input
                      type="time"
                      name="time42"
                      min="06:00"
                      max="22:00"
                      className={styles.time}
                    />
                    <ReactBootstrap.Form.Select
                      aria-label="Default select example"
                      className={styles["option-block"]}
                      name="lang42"
                    >
                      <option value="1" className={styles["select-option"]}>
                        Hindi-3D
                      </option>
                      <option value="2" className={styles["select-option"]}>
                        English-3D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        Hindi-2D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        English-2D
                      </option>
                    </ReactBootstrap.Form.Select>
                  </div>
                  <div className={styles["time-lang"]}>
                    <input
                      type="time"
                      name="time43"
                      min="06:00"
                      max="22:00"
                      className={styles.time}
                    />
                    <ReactBootstrap.Form.Select
                      aria-label="Default select example"
                      className={styles["option-block"]}
                      name="lang43"
                    >
                      <option value="1" className={styles["select-option"]}>
                        Hindi-3D
                      </option>
                      <option value="2" className={styles["select-option"]}>
                        English-3D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        Hindi-2D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        English-2D
                      </option>
                    </ReactBootstrap.Form.Select>
                  </div>
                  <div className={styles["time-lang"]}>
                    <input
                      type="time"
                      name="time44"
                      min="06:00"
                      max="22:00"
                      className={styles.time}
                    />
                    <ReactBootstrap.Form.Select
                      aria-label="Default select example"
                      className={styles["option-block"]}
                      name="lang44"
                    >
                      <option value="1" className={styles["select-option"]}>
                        Hindi-3D
                      </option>
                      <option value="2" className={styles["select-option"]}>
                        English-3D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        Hindi-2D
                      </option>
                      <option value="3" className={styles["select-option"]}>
                        English-2D
                      </option>
                    </ReactBootstrap.Form.Select>
                  </div>
                </div>
              </div>
            )
          ) : null
        ) : null}
        <button type="submit" className={`${styles.button}`}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default TheatreAddShow;
