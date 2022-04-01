import React, { useState, useContext, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";

import AuthContext from "../../store/auth-context";
import styles from "./TheatreSeatsModal.module.css";

const TheatreSeatsModal = () => {
  const { es, ps } = useParams();

  const location = useLocation();

  const navigate = useNavigate();

  const executive = es.substring(1, 2);
  const premium = ps.substring(1, 2);

  const [usedSeats, setUsedSeats] = useState([]);

  const [seats, setSeats] = useState({
    esc: Number(executive),
    psc: Number(premium),
    es: [],
    ps: [],
  });

  const { entity } = useContext(AuthContext);

  const clickHandler = (ev) => {
    const id = ev.target.id;
    const element = document.getElementById(id);
    if (id.substring(1, 2) === "E") {
      const exCPS = seats.esc;
      const exCS = seats.es;
      if (!element.classList.contains(styles.active) && exCPS > 0) {
        exCS.push(id);
        setSeats((prev) => {
          return {
            ...prev,
            esc: exCPS - 1,
            es: exCS,
          };
        });
        element.classList.toggle(styles.active);
      } else if (element.classList.contains(styles.active)) {
        const seatIndex = exCS.indexOf(id);
        if (seatIndex > -1) exCS.splice(seatIndex, 1);
        setSeats((prev) => {
          return {
            ...prev,
            esc: exCPS + 1,
            es: exCS,
          };
        });
        element.classList.toggle(styles.active);
      }
    } else if (id.substring(1, 2) === "P") {
      const prCPS = seats.psc;
      const prCS = seats.ps;
      if (!element.classList.contains(styles.active) && prCPS > 0) {
        prCS.push(id);
        setSeats((prev) => {
          return {
            ...prev,
            psc: prCPS - 1,
            ps: prCS,
          };
        });
        element.classList.toggle(styles.active);
      } else if (element.classList.contains(styles.active)) {
        const seatIndex = prCS.indexOf(id);
        if (seatIndex > -1) prCS.splice(seatIndex, 1);
        setSeats((prev) => {
          return {
            ...prev,
            psc: prCPS + 1,
            ps: prCS,
          };
        });
        element.classList.toggle(styles.active);
      }
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (seats.es.length > 0 || seats.ps.length > 0) {
      const obj = {
        ...location.state,
        executiveSeats: seats.es,
        premiumSeats: seats.ps,
      };
      navigate("/order-summary", { replace: true, state: obj });
    }
  };

  const getSeatsStatus = () => {
    fetch("http://localhost:8080/seats-status", {
      method: "POST",
      body: JSON.stringify({
        ...location.state,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + entity.token,
      },
    })
      .then((res) => {
        if (res.status >= 200 && res.status <= 299) {
          return res.json().then((response) => {
            if ("data" in response && response.data !== null) {
              setUsedSeats([
                ...response.data.executiveSeats,
                ...response.data.premiumSeats,
              ]);
            }
          });
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
    getSeatsStatus();
  }, []);

  return (
    <div className={styles.container}>
      <div> Executive Class</div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="1E1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E1")}
        >
          1
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E2")}
        >
          2
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E3")}
        >
          3
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E4")}
        >
          4
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E5")}
        >
          5
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E6")}
        >
          6
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E7")}
        >
          7
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E8")}
        >
          8
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E9")}
        >
          9
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1E0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1E0")}
        >
          10
        </ReactBootstrap.Button>
      </div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="2E1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E1")}
        >
          11
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E2")}
        >
          12
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E3")}
        >
          13
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E4")}
        >
          14
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E5")}
        >
          15
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E6")}
        >
          16
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E7")}
        >
          17
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E8")}
        >
          18
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E9")}
        >
          19
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2E0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2E0")}
        >
          20
        </ReactBootstrap.Button>
      </div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="3E1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E1")}
        >
          21
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E2")}
        >
          22
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E3")}
        >
          23
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E4")}
        >
          24
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E5")}
        >
          25
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E6")}
        >
          26
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E7")}
        >
          27
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E8")}
        >
          28
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E9")}
        >
          29
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3E0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3E0")}
        >
          30
        </ReactBootstrap.Button>
      </div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="4E1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E1")}
        >
          31
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E2")}
        >
          32
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E3")}
        >
          33
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E4")}
        >
          34
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E5")}
        >
          35
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E6")}
        >
          36
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E7")}
        >
          37
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E8")}
        >
          38
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E9")}
        >
          39
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="4E0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("4E0")}
        >
          40
        </ReactBootstrap.Button>
      </div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="5E1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E1")}
        >
          41
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E2")}
        >
          42
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E3")}
        >
          43
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E4")}
        >
          44
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E5")}
        >
          45
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E6")}
        >
          46
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E7")}
        >
          47
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E8")}
        >
          48
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E9")}
        >
          49
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="5E0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("5E0")}
        >
          50
        </ReactBootstrap.Button>
      </div>
      <div> Premium Class</div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="1P1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P1")}
        >
          1
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P2")}
        >
          2
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P3")}
        >
          3
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P4")}
        >
          4
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P5")}
        >
          5
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P6")}
        >
          6
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P7")}
        >
          7
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P8")}
        >
          8
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P9")}
        >
          9
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="1P0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("1P0")}
        >
          10
        </ReactBootstrap.Button>
      </div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="2P1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P1")}
        >
          11
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P2")}
        >
          12
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P3")}
        >
          13
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P4")}
        >
          14
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P5")}
        >
          15
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P6")}
        >
          16
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P7")}
        >
          17
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P8")}
        >
          18
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P9")}
        >
          19
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="2P0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("2P0")}
        >
          20
        </ReactBootstrap.Button>
      </div>
      <div className={styles["sub-container"]}>
        <ReactBootstrap.Button
          id="3P1"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P1")}
        >
          21
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P2"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P2")}
        >
          22
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P3"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P3")}
        >
          23
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P4"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P4")}
        >
          24
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P5"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P5")}
        >
          25
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P6"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P6")}
        >
          26
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P7"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P7")}
        >
          27
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P8"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P8")}
        >
          28
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P9"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P9")}
        >
          29
        </ReactBootstrap.Button>
        <ReactBootstrap.Button
          id="3P0"
          variant="outline-success"
          className={styles.seat}
          onClick={clickHandler}
          disabled={usedSeats.includes("3P0")}
        >
          30
        </ReactBootstrap.Button>
      </div>
      <div>
        <ReactBootstrap.Button
          variant="outline-success"
          className={styles.submit}
          onClick={submitHandler}
          type="submit"
        >
          Confirm Seats
        </ReactBootstrap.Button>
      </div>
    </div>
  );
};

export default TheatreSeatsModal;
