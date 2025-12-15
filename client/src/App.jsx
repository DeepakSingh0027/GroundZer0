import { useState } from "react";
import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/themeContext";
import { UserProvider } from "./context/userContext.jsx";
import "./App.css";
import Header from "./headers/header.jsx";
import SignUp from "./pages/signup.jsx";
import Chat from "./pages/chat.jsx";
import GlobalBackground from "./components/background/GlobalBackground.jsx";

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
          <Route
            path="/chat"
            element={
              <>
                <Chat />
              </>
            }
          />
        </Routes>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
