import React, { useState, useContext, Fragment } from "react";
import { createPortal } from "react-dom";
import { useNavigate, useLocation } from "react-router-dom";
import * as ReactBootstrap from "react-bootstrap";

import authContext from "../../store/auth-context";
import SuccessModal from "../OverLays/SuccessModal";
import BackDrop from "../OverLays/BackDrop";
import styles from "./OrderSummay.module.css";
import RazorpayLogo from "../../assets/razorpay-logo.jpg";
import covidProtocol from "../../assets/covid-protocols.jpg";

const loadPaymentScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    document.body.appendChild(script);
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
  });
};

const OrderSummary = () => {
  const { entity } = useContext(authContext);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const ticketsTotal =
    130 * state.executiveSeats.length + 300 * state.premiumSeats.length;

  const getRazorPayOrderId = () => {
    const obj = {
      amount: Math.round(1.15 * ticketsTotal),
      currency: "INR",
    };

    return fetch("http://localhost:8080/generate-razorpayid", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
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

  const displayRazorpayModal = async (callback) => {
    const res = await loadPaymentScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) return new Promise((resolve) => resolve(false));

    const result = await getRazorPayOrderId();

    var options = {
      key: process.env.REACT_APP_RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      amount: Math.round(1.15 * ticketsTotal) * 100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: "INR",
      name: "Ticket Booking App",
      description: "Pay for your show tickets",
      image: RazorpayLogo,
      order_id: result.orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      prefill: {
        name: entity.name,
      },
      theme: {
        color: "#3399cc",
      },
      handler: function (response) {
        callback(response);
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", (response) => {
      alert(response.error.description);
    });

    rzp1.open();
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const res = await displayRazorpayModal((res) => {
      const obj = { ...state };
      fetch("http://localhost:8080/book-ticket", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + entity.token,
        },
      })
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            res.json().then((result) => {
              setTimeout(() => {
                navigate("/", { replace: true });
              }, 5000);
              setShowModal(true);
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
    });
  };

  return (
    <Fragment>
      <div className={styles.main}>
        <div className={styles["img-container"]}>
          <img src={covidProtocol} className={styles.img} />
        </div>
        <div className={styles.summary}>
          <h1 className={styles["payment-header"]}>Order Summary</h1>
          <h2 className={styles["movie-title"]}>{state.movieName}</h2>
          <div className={styles["summary-content"]}>
            {/*  */}
            <p className={styles.parah}>Theatre: {state.theatreName}</p>
            <p className={styles.parah}>Date: {state.date}</p>
            <p className={styles.parah}>Show Time: {state.time}</p>
            {state.executiveSeats.length > 0 && (
              <p className={styles.parah}>
                Executive Class: {state.executiveSeats.length} Seats
              </p>
            )}
            {state.premiumSeats.length > 0 && (
              <p className={styles.parah}>
                Premium Class: {state.premiumSeats.length} Seats
              </p>
            )}
          </div>
          <div>
            <div className={styles["pricing-div"]}>
              <div className={styles.content}>Tickets Total</div>
              <div className={styles.content}>Rs {ticketsTotal}</div>
            </div>
            <div className={styles["pricing-div"]}>
              <div className={styles.content}>Tax(15%)</div>
              <div className={styles.content}>Rs {0.15 * ticketsTotal}</div>
            </div>
            <div className={styles["pricing-div"]}>
              <div className={styles.content}>Total Amount</div>
              <div className={styles.price}>
                Rs {Math.round(1.15 * ticketsTotal)}
              </div>
            </div>

            <ReactBootstrap.Button
              variant="secondary"
              type="submit"
              onClick={submitHandler}
              className={styles.button}
            >
              Payment
            </ReactBootstrap.Button>
          </div>
        </div>
      </div>
      {showModal &&
        createPortal(
          <Fragment>
            <BackDrop />
            <SuccessModal />
          </Fragment>,
          document.getElementById("overlay-root")
        )}
    </Fragment>
  );
};

export default OrderSummary;
