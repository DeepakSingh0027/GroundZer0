import React, { createContext, useState, useEffect } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(1);

  useEffect(() => {
    if (theme === 1) {
      document.body.style.backgroundColor = "#060010";
    } else {
      document.body.style.backgroundColor = "#fdf6e3";
    }
  }, [theme]);
  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};
