import React, { useContext, useState, useEffect } from "react";
import { themeContext } from "./../context/themeContext";
import {
  Menu,
  Briefcase,
  HelpCircle,
  FileText,
  Info,
  Sun,
  Moon,
} from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const { theme, setTheme } = useContext(themeContext);
  const [isOpen, setIsOpen] = useState(false);

  const isDark = theme === 1;
  const nextTheme = isDark ? 0 : 1;

  const links = [
    { href: "/blogs", label: "Blogs", icon: <Briefcase className="h-4 w-4" /> },
    { href: "/faq", label: "FAQ", icon: <HelpCircle className="h-4 w-4" /> },
    {
      href: "/trending",
      label: "Trending",
      icon: <FileText className="h-4 w-4" />,
    },
    { href: "/about", label: "About", icon: <Info className="h-4 w-4" /> },
  ];

  useEffect(() => {
    if (isDark) {
      document.body.style.backgroundColor = "#060010";
    } else {
      document.body.style.backgroundColor = "#fdf6e3";
    }
  }, [isDark]);

  const ThemeToggle = () => (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(nextTheme)}
      className={`flex items-center gap-2 bg-white/5 rounded-full shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] backdrop-blur-lg px-3 py-1.5 text-xs ${
        isDark
          ? "text-gray-200 hover:bg-gray-900 hover:text-purple-300"
          : "text-gray-800 hover:bg-gray-200 hover:text-purple-400"
      } transition-colors`}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      <span className="hidden sm:inline">{isDark ? "Light" : "Dark"} mode</span>
    </button>
  );

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 p-4 mt-5 h-full pointer-events-none`}
    >
      <div className="absolute bottom-10 left-6 pointer-events-auto">
        <ThemeToggle />
      </div>
      <div className="container mx-auto max-w-4xl pointer-events-auto">
        <div className="flex bg-white/5 h-14 items-center justify-between px-6 rounded-full shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] backdrop-blur-lg">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-1.5">
            <img src="/brand-logo.png" alt="logo" className="h-5 w-10" />
            <span
              className={`font-semibold tracking-wide ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              GroundZer0
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className={`hidden md:flex items-center gap-6 text-sm ${
              isDark ? "text-gray-300" : "text-gray-800"
            }`}
          >
            {links.map((l) => (
              <Link
                key={l.href}
                to={l.href}
                className="hover:text-purple-300 transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center text-sm gap-2">
            <Link
              to="/"
              className={`rounded-lg py-2.5 pr-1.5 transition-all ${
                isDark
                  ? "text-gray-300 hover:text-purple-300"
                  : "text-gray-800 hover:text-purple-400"
              }`}
            >
              SignUp / Login
            </Link>
          </div>

          {/* Mobile Nav Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden p-2 rounded-lg shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)] backdrop-blur-lg 
    ${
      isDark
        ? "bg-white/5 text-white hover:bg-white/10"
        : "bg-black/5 text-black hover:bg-black/10"
    }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div
            className={`absolute right-4 mt-2 w-64 rounded-2xl p-4 flex flex-col backdrop-blur-lg shadow-[0_0_0_0.5px_rgba(255,255,255,0.3)]
      ${isDark ? "bg-white/5 text-gray-200" : "bg-black/5 text-gray-800"}`}
          >
            {/* Nav Links */}
            <nav className="flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.href}
                  to={l.href}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors 
            ${
              isDark
                ? "hover:bg-white/10 hover:text-purple-300"
                : "hover:bg-black/10 hover:text-purple-500"
            }`}
                >
                  {l.icon}
                  <span>{l.label}</span>
                </Link>
              ))}
            </nav>

            {/* CTA */}
            <div className="mt-4 space-y-2">
              <Link
                to="/"
                className={`block w-full text-center font-medium rounded-lg px-6 py-2.5 transition-all
          ${
            isDark
              ? "hover:bg-white/10 hover:text-purple-300 text-shadow-white hover:shadow-md hover:scale-[1.02]"
              : "hover:bg-black/10 hover:text-purple-500 text-shadow-black hover:shadow-md hover:scale-[1.02]"
          }`}
              >
                SignUp / Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
