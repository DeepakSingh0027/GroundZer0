import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import "./App.css";
import Header from "./headers/header.jsx";
import SignUp from "./pages/signup.jsx";

function App() {
  return (
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
  );
}

export default App;
