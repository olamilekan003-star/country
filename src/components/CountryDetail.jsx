// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";

// export default function CountryDetail() {
//   const { name } = useParams();
//   const [country, setCountry] = useState(null);
//   const [borders, setBorders] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchCountry = async () => {
//       try {
//         const response = await fetch(
//           `https://restcountries.com/v3.1/name/${name}?fullText=true`
//         );
//         if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//         const data = await response.json();
//         const c = data[0];
//         setCountry(c);

       
//         if (c.borders && c.borders.length > 0) {
//           const borderRes = await fetch(
//             `https://restcountries.com/v3.1/alpha?codes=${c.borders.join(",")}`
//           );
//           const borderData = await borderRes.json();
//           setBorders(borderData);
//         } else {
//           setBorders([]);
//         }
//       } catch (err) {
//         setError(err.message);
//       }
//     };
//     fetchCountry();
//   }, [name]);

//   if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
//   if (!country) return <p>Loading country details...</p>;

//    return (
//     <div style={{ padding: "2rem" }}>
//       <Link
//         to="/"
//         style={{
//           textDecoration: "none",
//           display: "inline-block",
//           marginBottom: "1rem",
//           backgroundColor: "#eee",
//           padding: "0.5rem 1rem",
//           borderRadius: "5px",
//         }}
//       >
//         ← Back
//       </Link>
  
//       <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
      
//         <img
//           src={country.flags.svg}
//           alt={country.name.common}
//           width="300"
//           style={{ borderRadius: "8px" }}
//         />
  
       
//         <div>
//           <h1>{country.name.common}</h1>
  
        
//           <p><strong>Native Name:</strong> {
//             country.name.nativeName
//               ? Object.values(country.name.nativeName)[0].common
//               : "N/A"
//           }</p>
//           <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//           <p><strong>Region:</strong> {country.region}</p>
//           <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
//           <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
  
       
//           <p><strong>Top Level Domain:</strong> {country.tld?.join(", ") || "N/A"}</p>
//           <p><strong>Currencies:</strong> {
//             country.currencies
//               ? Object.values(country.currencies)
//                   .map((c) => `${c.name} (${c.symbol || ""})`)
//                   .join(", ")
//               : "N/A"
//           }</p>
//           <p><strong>Languages:</strong> {
//             country.languages
//               ? Object.values(country.languages).join(", ")
//               : "N/A"
//           }</p>
  
 
//           <div style={{ marginTop: "1.5rem" }}>
//             <h3>Border Countries:</h3>
//             {borders.length > 0 ? (
//               borders.map((b) => (
//                 <Link
//                   key={b.cca3}
//                   to={`/country/${b.name.common}`}
//                   style={{
//                     display: "inline-block",
//                     margin: "0.25rem",
//                     padding: "0.5rem 1rem",
//                     border: "1px solid #ccc",
//                     borderRadius: "5px",
//                     textDecoration: "none",
//                     color: "inherit",
//                   }}
//                 >
//                   {b.name.common}
//                 </Link>
//               ))
//             ) : (
//               <p>No border countries.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
//  }
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./CountryDetail.css";

export default function CountryDetail() {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [borders, setBorders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        const c = data[0];
        setCountry(c);

        if (c.borders && c.borders.length > 0) {
          const borderRes = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${c.borders.join(",")}`
          );
          const borderData = await borderRes.json();
          setBorders(borderData);
        } else {
          setBorders([]);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCountry();
  }, [name]);

  if (error) return <p className="error">Error: {error}</p>;
  if (!country) return <p className="loading">Loading country details...</p>;

  return (
    <div className="country-detail-page">
      <Link to="/" className="back-button">← Back</Link>

      <div className="country-detail-container">
        {/* Flag */}
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="country-flag"
        />

        {/* Info Section */}
        <div className="country-info">
          <h1 className="country-name">{country.name.common}</h1>

          <div className="country-columns">
            <div className="country-col">
              <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : "N/A"}</p>
              <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
              <p><strong>Region:</strong> {country.region}</p>
              <p><strong>Subregion:</strong> {country.subregion || "N/A"}</p>
              <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
            </div>

            <div className="country-col">
              <p><strong>Top Level Domain:</strong> {country.tld?.join(", ") || "N/A"}</p>
              <p><strong>Currencies:</strong> {
                country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => `${c.name} (${c.symbol || ""})`)
                      .join(", ")
                  : "N/A"
              }</p>
              <p><strong>Languages:</strong> {
                country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"
              }</p>
            </div>
          </div>

          {/* Border Countries */}
          <div className="borders-section">
            <h3>Border Countries:</h3>
            {borders.length > 0 ? (
              <div className="borders-list">
                {borders.map((b) => (
                  <Link
                    key={b.cca3}
                    to={`/country/${b.name.common}`}
                    className="border-link"
                  >
                    {b.name.common}
                  </Link>
                ))}
              </div>
            ) : (
              <p>No border countries.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
