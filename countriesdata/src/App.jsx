import React, { useState, useEffect } from "react";
import countriesServices from "./services/countriesServices";
import openWeaitherAPI from "./services/openWeaitherAPI"; // Assuming you have a service to fetch countries

const App = () => {
  const [countries, setCountries] = useState(null);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    countriesServices.getAllCountries().then((initialCountries) => {
      setCountries(initialCountries);
    });
  }, []);

  const handleSearchChange = (e) => {
    const search = e.target.value;
    setSearch(search);

    const filtered = countries.data.filter(
      (country) =>
        country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1
    );
    setFilteredCountries(filtered);
  };

  const fetchWeather = (country) => {
    const [lat, lon] = country.capitalInfo.latlng;
    openWeaitherAPI.getWeather(lat, lon).then((response) => {
      setWeather(response.data);
    });
  };

  return (
    <div>
      <h1>Simple Countries data App</h1>
      <div>
        <label htmlFor="countries">Find Countries</label>
        <input
          type="text"
          placeholder="e.g Kenya"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
      {filteredCountries.length > 10 ? (
        <p>Too many matches select another value</p>
      ) : filteredCountries.length === 1 ? (
        filteredCountries.map((country) => {
          return (
            <div key={country.name.common}>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital}</p>
              <h3>Capital city info</h3>
              <p>Latitude: {country.capitalInfo.latlng[0]}</p>
              <p>Longitude: {country.capitalInfo.latlng[1]}</p>
              <p>Population: {country.population}</p>
              <p>Area: {country.area}</p>
              <h3>Languages</h3>
              <ul>
                {Object.values(country.languages).map((language) => (
                  <li key={language}>{language}</li>
                ))}
              </ul>
              <h3>Flag</h3>
              <img src={country.flags.png} alt={country.flags.alt} />
            </div>
          );
        })
      ) : (
        filteredCountries.map((country) => {
          const showCountry = () => {
            setFilteredCountries([country]);
          };
          return (
            <div key={country.name.common}>
              <p>{country.name.common}</p>
              <button onClick={showCountry}>show</button>
            </div>
          );
        })
      )}
    </div>
  );
};

export default App;
