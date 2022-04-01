import React, { useState, useEffect } from "react";

const AuthContext = React.createContext(null);

let storeTimeout;

const calculateRemainingTime = (expiryDate) => {
  return new Date(expiryDate) - new Date();
};

const AuthContextProvider = (props) => {
  const entityAccount = JSON.parse(localStorage.getItem("entity"));

  const [entity, setEntity] = useState(entityAccount);

  const isLoggedIn = !entity ? false : !!entity.token;

  const logoutHandler = () => {
    if (storeTimeout) clearTimeout(storeTimeout);

    setEntity(null);
    localStorage.removeItem("entity");
  };

  useEffect(() => {
    if (entity) {
      const remainingTime = calculateRemainingTime(entity.expiresAt);
      if (remainingTime > 3000) {
        if (storeTimeout) clearTimeout(storeTimeout);
        storeTimeout = setTimeout(logoutHandler, remainingTime);
      } else logoutHandler();
    }
  }, [entity]);

  const loginHandler = ({ token, name, scope, expiresIn }) => {
    const expiresAt = new Date(new Date().getTime() + expiresIn * 1000);
    const entityObject = {
      token,
      name,
      scope,
      expiresAt,
    };
    setEntity(entityObject);
    localStorage.setItem("entity", JSON.stringify(entityObject));
    storeTimeout = setTimeout(logoutHandler, expiresIn * 1000);
  };

  return (
    <AuthContext.Provider
      value={{ entity, isLoggedIn, loginHandler, logoutHandler }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
export { AuthContextProvider };
