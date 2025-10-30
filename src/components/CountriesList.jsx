// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { ThemeContext } from "../ThemeContext";
// import "./CountriesList.css";

// function CountriesList() {
//   const [countries, setCountries] = useState([]);
//   const [filtered, setFiltered] = useState([]);
//   const [search, setSearch] = useState("");
//   const [region, setRegion] = useState("");
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCountries = async () => {
//       try {
//         const response = await fetch(
//           "https://countriesnow.space/api/v0.1/countries/flag/images"
//         );
//         if (!response.ok)
//           throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         setCountries(data.data);
//         setFiltered(data.data);
//       } catch (err) {
//         setError(err.message);
//         console.error("Error fetching countries:", err);
//       }
//     };
//     fetchCountries();
//   }, []);

 
//   useEffect(() => {
//     let results = countries.filter((c) =>
//       c.name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFiltered(results);
//   }, [search, countries]);

//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
//   if (countries.length === 0) return <p>Loading...</p>;

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h1>🌍 All Countries</h1>

//       <div style={{ marginBottom: "1rem" }}>
//         <input
//           type="text"
//           placeholder="Search by name..."
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           style={{
//             padding: "0.5rem",
//             marginRight: "1rem",
//             width: "200px",
//           }}
//         />
//       </div>

  
//       <ul style={{ listStyle: "none", padding: 0 }}>
//         {filtered.map((country) => (
//           <li
//             key={country.iso2}
//             style={{
//               display: "flex",
//               alignItems: "center",
//               marginBottom: "0.5rem",
//               border: "1px solid #ccc",
//               padding: "0.5rem",
//               borderRadius: "6px",
//             }}
//           >
//             <img
//               src={country.flag}
//               alt={country.name}
//               width="40"
//               style={{ marginRight: "1rem", borderRadius: "4px" }}
//             />
          
//             <Link
//               to={`/country/${encodeURIComponent(country.name)}`}
//               style={{
//                 textDecoration: "none",
//                 color: "inherit",
//               }}
//             >
//               {country.name}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default CountriesList;

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

  // Fetch data
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

  // Search filter
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

      {/* Search Input */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Country Cards */}
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

