import React, { createContext, useState } from "react";

export const themeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(0);

  return (
    <themeContext.Provider value={{ theme, setTheme }}>
      {children}
    </themeContext.Provider>
  );
};
