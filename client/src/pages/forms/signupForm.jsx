import React, { useContext } from "react";
import { themeContext } from "../../context/themeContext";
import { ChevronDown, Mail, Lock } from "lucide-react";

const SignUpForm = ({
  userotp,
  isOtpSent,
  setUserOtp,
  handleRedirect,
  setFirstName,
  firstName,
  lastName,
  setLastName,
  email,
  setEmail,
  phoneNumber,
  setPhoneNumber,
  isLoading,
}) => {
  const { theme } = useContext(themeContext);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleRedirect();
        }}
        className="space-y-4"
      >
        {/* Name fields */}
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 w-full px-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
            placeholder="First name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 w-full px-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
            placeholder="Last name"
          />
        </div>
        {/* Email field */}
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 w-full pl-12 px-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
            placeholder="Enter your email"
          />
        </div>
        {/* Phone field */}
        <div className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {/* Tiny flag mock */}
            <div className="w-6 h-4 bg-red-500 relative overflow-hidden rounded-sm">
              <img src="flag.png" alt="India" />
            </div>
            <ChevronDown className="w-4 h-4 text-white/40" />
          </div>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 w-full pl-20 px-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
            placeholder="Phone number"
          />
        </div>
        {isOtpSent && (
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
            <input
              type="otp"
              value={userotp}
              onChange={(e) => setUserOtp(e.target.value)}
              className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 w-full pl-20 px-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
              placeholder="OTP"
            />
          </div>
        )}
        {/* Create account button */}
        <button
          type="submit"
          className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-14 mt-8 text-base transition-all duration-300 transform hover:shadow-lg active:scale-[0.98]"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create an account"}
        </button>
      </form>
    </>
  );
};

export default SignUpForm;
