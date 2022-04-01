import React, { Fragment, useState, useContext } from "react";
import { createPortal } from "react-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaSearch } from "react-icons/fa";

import SigningForm from "../Login/SigningForm";
import BackDrop from "../OverLays/BackDrop";
import AuthContext from "../../store/auth-context";
import styles from "./NavBar.module.css";

const NavBar = (props) => {
  const { isLoggedIn, logoutHandler } = useContext(AuthContext);

  const [isLargeScreen, setIsLargeScreen] = useState(
    window.innerWidth > 750 ? true : false
  );
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const iconClickHandler = () => {
    setShowSearchBar(!showSearchBar);
  };

  const changeHandler = (event) => {
    setSearchValue(event.target.value);
  };

  const clickHandler = () => {
    setSearchValue("");
    setShowSearchBar(false);
    props.setToBeSearchedString(searchValue);
    navigate("/");
  };

  const resizeHandler = () => {
    const width = window.innerWidth;
    if (width >= 750 && !isLargeScreen) {
      setShowSearchBar(false);
      setIsLargeScreen(true);
    } else if (width < 750 && isLargeScreen) {
      setIsLargeScreen(false);
    }
  };

  window.addEventListener("resize", resizeHandler);

  return (
    <Fragment>
      <div className={`${styles.container} ${styles.navbar}`}>
        <div>
          <h1 className={styles.brand}>Book My Ticket</h1>
        </div>
        <div>
          {!isLargeScreen ? (
            <IconContext.Provider
              value={{
                className: `${styles.icon}`,
              }}
            >
              <FaSearch onClick={iconClickHandler} />
            </IconContext.Provider>
          ) : (
            <form>
              <input
                type="text"
                placeholder="Search Your Show"
                className={styles.input}
                name="searchValue"
                value={searchValue}
                onChange={changeHandler}
              />
              <button
                type="button"
                className={`${styles.button}`}
                onClick={clickHandler}
              >
                Search
              </button>
            </form>
          )}
        </div>

        {!isLoggedIn && (
          <div
            onClick={() => {
              setShowModal(true);
            }}
            className={`${styles.button} ${styles.signIn}`}
          >
            SignIn
          </div>
        )}
        {isLoggedIn && (
          <div
            onClick={() => {
              navigate("/");
              logoutHandler();
            }}
            className={`${styles.button} ${styles.signIn}`}
          >
            LogOut
          </div>
        )}
      </div>
      {showSearchBar && !isLargeScreen && (
        <div>
          <form className={styles["dropdown-form"]}>
            <input
              type="text"
              placeholder="Search Your Show"
              className={`${styles.input} ${styles["dropdown-input"]}`}
              name="searchValue"
              value={searchValue}
              onChange={changeHandler}
            />
            <button
              type="button"
              className={`${styles.button} ${styles["dropdown-button"]}`}
              onClick={clickHandler}
            >
              Search
            </button>
          </form>
        </div>
      )}
      {showModal &&
        createPortal(
          <Fragment>
            <BackDrop showModal={setShowModal} />
            <SigningForm showModal={setShowModal} />
          </Fragment>,
          document.getElementById("overlay-root")
        )}
    </Fragment>
  );
};

export default NavBar;
