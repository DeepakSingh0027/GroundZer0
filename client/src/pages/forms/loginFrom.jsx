import React, { useContext } from "react";
import { themeContext } from "../../context/themeContext";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  rememberMe,
  setRememberMe,
  showPassword,
  setShowPassword,
  isLoading,
  handleRedirect,
  onForgotPassword,
}) => {
  const { theme } = useContext(themeContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleRedirect();
      }}
      className="space-y-4"
    >
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

      {/* Password field */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-2xl h-14 w-full pr-12 px-4 text-white placeholder:text-white/40 focus:border-white/30 focus:ring-0 text-base transition-all duration-200 hover:bg-black/30 focus:bg-black/30"
          placeholder="Enter your password"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors duration-200"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Remember me and forgot password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="w-4 h-4 rounded border border-white/20 bg-black/20 text-white focus:ring-white/20 focus:ring-2"
          />
          <span className="text-white/60 text-sm">Remember me</span>
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-white/60 hover:text-white text-sm transition-colors duration-200"
        >
          Forgot password?
        </button>
      </div>

      {/* Sign in button */}
      <button
        type="submit"
        className="w-full bg-white/20 backdrop-blur-sm border border-white/20 hover:bg-white/30 text-white font-medium rounded-2xl h-14 mt-8 text-base transition-all duration-300 transform hover:shadow-lg active:scale-[0.98]"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
};

export default LoginForm;
