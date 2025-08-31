import React from "react";
import LightRays from "./../components/ui/LightRays";
import { themeContext } from "./../context/themeContext.jsx";
import { useContext, useState, useEffect } from "react";
import SignUpForm from "./forms/signupForm.jsx";
import LoginForm from "./forms/loginFrom.jsx";
import "./signup.css";
import AnimatedDiv from "./../components/ui/animateDiv.jsx";

const SignUp = () => {
  const { theme, setTheme } = useContext(themeContext);
  const [activeTab, setActiveTab] = useState("signup");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [otp, setOtp] = useState("");
  const [userotp, setUserOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const handleRedirect = () => {
    setIsLoading(true);
    if (activeTab === "signup") {
      setIsOtpSent(true);
    } else {
      setIsOtpSent(false);
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const handleSignup = () => {
    console.log("Signup button clicked");
    setActiveTab("signup");
  };

  const handleSignin = () => {
    console.log("Signin button clicked");
    setActiveTab("signin");
  };

  useEffect(() => {
    console.log(activeTab);
  }, [activeTab]);
  return (
    <>
      <div className="w-[100%] h-[100%] fixed -z-10">
        <LightRays
          raysOrigin="top-center"
          raysColor={`${theme === 1 ? "#ffffff" : "#000000"}`}
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>
      <div className="relative z-10 flex justify-center items-center h-screen">
        <h1
          className={`text-3xl font-bold text-center align-middle ${
            theme === 1 ? "shiny-text-dark" : "shiny-text"
          } pr-0`}
        >
          Welcome to
        </h1>
        <img
          src="/brand-logo.png"
          alt="logo"
          className="h-7 w-17 pl-1 ml-0 #000000"
        />
        <h1
          className={`text-3xl font-bold text-center align-middle ${
            theme === 1 ? "shiny-text-dark" : "shiny-text"
          } pr-0`}
        >
          !
        </h1>
      </div>
      <AnimatedDiv>
        <div className="w-full max-w-md mx-auto mb-15">
          <div className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
            <div className="items-center justify-between mb-8">
              <div className="flex bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/10 w-50 mb-5">
                <button
                  type="button"
                  onClick={handleSignup}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${
                    activeTab === "signup"
                      ? "bg-white/20 backdrop-blur-sm text-white border border-white/20 shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Sign up
                </button>
                <button
                  type="button"
                  onClick={handleSignin}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform ${
                    activeTab === "signin"
                      ? "bg-white/20 backdrop-blur-sm text-white border border-white/20 shadow-lg"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Sign in
                </button>
              </div>
              <h1 className="text-3xl font-normal text-white mb-6 transition-all duration-300">
                {activeTab === "signup" ? "Create an account" : "Welcome back"}
              </h1>
              <div className="relative overflow-hidden">
                <div
                  className={`transition-all duration-500 ease-in-out transform ${
                    activeTab === "signup"
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-full opacity-0 absolute inset-0"
                  }`}
                >
                  <SignUpForm
                    userotp={userotp}
                    isOtpSent={isOtpSent}
                    setUserOtp={setUserOtp}
                    handleRedirect={handleRedirect}
                    setFirstName={setFirstName}
                    firstName={firstName}
                    lastName={lastName}
                    setLastName={setLastName}
                    email={email}
                    setEmail={setEmail}
                    phoneNumber={phoneNumber}
                    setPhoneNumber={setPhoneNumber}
                    isLoading={isLoading}
                  />
                </div>
                {/* Login form */}
                <div
                  className={`transition-all duration-500 ease-in-out transform ${
                    activeTab === "signin"
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0 absolute inset-0"
                  }`}
                >
                  <LoginForm
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    rememberMe={rememberMe}
                    setRememberMe={setRememberMe}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    isLoading={isLoading}
                    handleRedirect={handleRedirect}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimatedDiv>
    </>
  );
};

export default SignUp;
