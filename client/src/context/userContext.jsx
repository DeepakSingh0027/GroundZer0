import React, { createContext, useState } from "react";

export const userContext = createContext();

export const UserProvider = ({ children }) => {
  const [isLogin, setLogin] = useState(false);
  const [userName, setUserName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [subscription, setSubscription] = useState(0);
  return (
    <userContext.Provider
      value={{
        isLogin,
        setLogin,
        userName,
        userId,
        setUserName,
        subscription,
        setSubscription,
      }}
    >
      {children}
    </userContext.Provider>
  );
};
