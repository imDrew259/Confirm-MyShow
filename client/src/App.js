import React, { Fragment, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import MovieDetails from "./components/TicketBooking/MovieDetails";
import HomePage from "./components/HomePage/HomePage";
import NavBar from "./components/NavBar/NavBar";
import BookTicket from "./components/TicketBooking/BookTicket";
import TheatreSeatsModal from "./components/OverLays/TheatreSeatsModal";
import OrderSummary from "./components/TicketBooking/OrderSummary";
import SigningForm from "./components/Login/SigningForm";
import AuthContext from "./store/auth-context";
import NotFound from "./components/Error/NotFound";
import TheatreAddShow from "./components/Theatre/TheatreAddShow";
import BackDrop from "./components/OverLays/BackDrop";

const App = () => {
  const { isLoggedIn, entity } = useContext(AuthContext);
  const [toBeSearched, setToBeSearchedString] = useState(null);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Fragment>
              <NavBar setToBeSearchedString={setToBeSearchedString} />
              <HomePage toBeSearched={toBeSearched} />
            </Fragment>
          }
        />
        <Route
          path="/show-details/:showId"
          element={
            isLoggedIn ? (
              <Fragment>
                <NavBar setToBeSearchedString={setToBeSearchedString} />
                <MovieDetails />{" "}
              </Fragment>
            ) : (
              createPortal(
                <Fragment>
                  <BackDrop />
                  <SigningForm />
                </Fragment>,
                document.getElementById("overlay-root")
              )
            )
          }
        />
        <Route
          path="/book-ticket/:showId"
          element={
            isLoggedIn ? (
              <Fragment>
                <NavBar setToBeSearchedString={setToBeSearchedString} />
                <BookTicket />
              </Fragment>
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/post-theatre/:showId/:showName"
          element={
            isLoggedIn ? (
              entity.scope === "THEATRE" ? (
                <TheatreAddShow />
              ) : (
                <Navigate to="/not-found" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/theatre-seats/:es/:ps"
          element={
            isLoggedIn ? (
              entity.scope === "USER" ? (
                <TheatreSeatsModal />
              ) : (
                <Navigate to="/not-found" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route
          path="/order-summary"
          element={
            isLoggedIn ? (
              entity.scope === "USER" ? (
                <Fragment>
                  <OrderSummary />
                </Fragment>
              ) : (
                <Navigate to="/not-found" replace />
              )
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
