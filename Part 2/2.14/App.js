import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
const Country = ({ name, capital, area, flag, inputLength, coordinates }) => {
  const [show, setShow] = useState(false);
  const [weather, setWeather] = useState("");

  //weather api
  const lat = coordinates[0];
  const lon = coordinates[1];
  const api_key = process.env.REACT_APP_WEATHER_KEY;
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`).then((response) => {
      setWeather(response.data.weather[0]);
      console.log(response.data.weather[0]);
    });
  }, []);
  const displayWeather = (
    <>
      <h3>Weather</h3>
      <h4>{weather.main}</h4>
      <h5>{weather.description}</h5>
      <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="" />
    </>
  );
  const lessInfo = (
    <p>
      <span>{name}</span>
      <button onClick={() => setShow(!show)}>show</button>
    </p>
  );
  const moreInfo = (
    <div style={{ borderBottom: "1px solid #ddd" }}>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <img src={flag} alt="Country flag" style={{ display: "block" }} />
      {weather !== "" ? displayWeather : null}
      <button onClick={() => setShow(!show)}>hide</button>
    </div>
  );
  if (inputLength === 1) return moreInfo;
  if (!show) return lessInfo;
  return moreInfo;
};

const CountryDisplay = ({ showCountries, inputLength }) => {
  if (showCountries.length > 10) return "Too many matches specify another filter";
  const countries = showCountries.map((country) => (
    <Country
      inputLength={inputLength}
      flag={country.flags.png}
      area={country.area}
      capital={country.capital}
      key={country.name.common}
      name={country.name.common}
      coordinates={country.latlng}
    />
  ));
  return countries;
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [countriesWeather, setCountriesWeather] = useState([]);
  const [showCountries, setShowCountries] = useState([]);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (value) => {
    setSearch(value);
    if (countries.length === 0) return;
    let searchedCountries = countries.filter((country) => country.name.common.toLowerCase().includes(value.toLowerCase()));
    setShowCountries(searchedCountries);
  };

  return (
    <div>
      <div>
        find countries <input type="text" value={search} onChange={(e) => handleSearch(e.target.value)} />
      </div>
      <div>{showCountries.length > 0 ? search === "" ? null : <CountryDisplay showCountries={showCountries} inputLength={showCountries.length} /> : null}</div>
    </div>
  );
};

export default App;
