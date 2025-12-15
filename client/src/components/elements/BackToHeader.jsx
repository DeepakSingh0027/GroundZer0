import { ArrowLeft } from "lucide-react";
import { themeContext } from "../../context/themeContext.jsx";
import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BackToHeader = () => {
  const { theme, setTheme } = useContext(themeContext);
  const navigate = useNavigate();
  return (
    <div className="fixed top-10 left-6 pointer-events-auto z-100">
      <button
        type="button"
        aria-label="backToHome"
        onClick={() => navigate("/")}
        className={`flex items-center gap-2 bg-white/5 rounded-full shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] backdrop-blur-lg px-3 py-3 text-xs ${
          theme === 1
            ? "text-gray-200 hover:bg-gray-900 hover:text-purple-300"
            : "text-gray-800 hover:bg-gray-200 hover:text-purple-400"
        } transition-colors`}
      >
        <ArrowLeft className="h-4 w-4" />
      </button>
    </div>
  );
};
export default BackToHeader;
