import { Sun, Moon } from "lucide-react";
import { themeContext } from "./../context/themeContext.jsx";
import { useContext, useState, useEffect } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useContext(themeContext);
  return (
    <div className="fixed bottom-10 left-6 pointer-events-auto z-100">
      <button
        type="button"
        aria-label="Toggle theme"
        onClick={() => setTheme(theme === 1 ? 0 : 1)}
        className={`flex items-center gap-2 bg-white/5 rounded-full shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] backdrop-blur-lg px-3 py-1.5 text-xs ${
          theme === 1
            ? "text-gray-200 hover:bg-gray-900 hover:text-purple-300"
            : "text-gray-800 hover:bg-gray-200 hover:text-purple-400"
        } transition-colors`}
      >
        {theme === 1 ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
        <span className="hidden sm:inline">
          {theme === 1 ? "Light" : "Dark"} mode
        </span>
      </button>
    </div>
  );
};
export default ThemeToggle;
