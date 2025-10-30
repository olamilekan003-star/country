 import "./index.css";
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CountriesList from "./components/CountriesList";
import CountryDetail from "./components/CountryDetail";
import { ThemeContext } from "./ThemeContext";

function App() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Router>
      <div
        className="app"
        style={{
          backgroundColor: darkMode ? "var(--bg-dark)" : "var(--bg-light)",
          color: darkMode ? "var(--text-dark)" : "var(--text-light)",
        }}
      > 

        <nav
          style={{
            backgroundColor: darkMode ? "var(--element-dark)" : "var(--element-light)",
          }}
        >
          <h2>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: darkMode ? "var(--text-dark)" : "var(--text-light)",
              }}
            >
              🌍 REST Countries
            </Link>
          </h2>

          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              color: darkMode ? "var(--text-dark)" : "var(--text-light)",
            }}
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </nav>
        

        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:name" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

