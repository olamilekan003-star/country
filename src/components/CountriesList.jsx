import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../ThemeContext";
import "./CountriesList.css";

function CountriesList() {
  const { darkMode } = useContext(ThemeContext);
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

 
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://countriesnow.space/api/v0.1/countries/flag/images"
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setCountries(data.data);
        setFiltered(data.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);


  useEffect(() => {
    let results = countries.filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase())
    );
    setFiltered(results);
  }, [search, countries]);

  if (error) return <p className="error">Error: {error}</p>;
  if (countries.length === 0) return <p className="loading">Loading...</p>;

  return (
    <div className={`countries-page ${darkMode ? "dark" : ""}`}>
      <h1 className="title">🌍 All Countries</h1>

     
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

    
      <div className="countries-container">
        {filtered.map((country) => (
          <Link
            to={`/country/${encodeURIComponent(country.name)}`}
            key={country.iso2}
            className="country-card"
          >
            <img src={country.flag} alt={country.name} />
            <div className="country-info">
              <h3>{country.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CountriesList;

