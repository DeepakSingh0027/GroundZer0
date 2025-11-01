import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import { UserProvider } from "./context/userContext.jsx";
import "./App.css";
import Header from "./headers/header.jsx";
import SignUp from "./pages/signup.jsx";

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <SignUp />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
