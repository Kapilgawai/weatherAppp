


import React, { useState, useEffect } from "react";
import axios from "axios";
import apiKeys from "./apiKeys";
import ReactAnimatedWeather from "react-animated-weather";

function Forcast({ city }) {
  const [query, setQuery] = useState(city || "");
  const [weather, setWeather] = useState({});
  const [error, setError] = useState("");

  const searchWeather = (cityQuery) => {
    axios
      .get(
        `${apiKeys.base}weather?q=${cityQuery}&units=metric&APPID=${apiKeys.key}`
      )
      .then((response) => {
        setWeather(response.data);
        setError("");
        setQuery("");
      })
      .catch((error) => {
        setWeather({});
        setError({ message: "City not found", query: query });
      });
  };

  useEffect(() => {
    if (city) searchWeather(city); // Use the city prop when component mounts
  }, [city]);

  const getWeatherIcon = (mainWeather) => {
    switch (mainWeather) {
      case "Haze":
        return "CLEAR_DAY";
      case "Clouds":
        return "CLOUDY";
      case "Rain":
        return "RAIN";
      case "Snow":
        return "SNOW";
      case "Dust":
        return "WIND";
      case "Drizzle":
        return "SLEET";
      case "Fog":
      case "Smoke":
        return "FOG";
      case "Tornado":
        return "WIND";
      default:
        return "CLEAR_DAY";
    }
  };

  const defaults = {
    color: "white",
    size: 112,
    animate: true,
  };

  return (
    <div className="forecast">
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search any city"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <button className="search-button" onClick={() => searchWeather(query)}>
          Search
        </button>
      </div>
      {error && <p>{error.message}</p>}
      {weather.main && (
        <div className="today-weather">
          <div className="forecast-icon">
            <ReactAnimatedWeather
              icon={getWeatherIcon(weather.weather[0].main)}
              color={defaults.color}
              size={defaults.size}
              animate={defaults.animate}
            />
          </div>
          <div className="forecast-details">
            <ul>
              <li className="cityHead">
                <p>
                  {weather.name}, {weather.sys.country}
                </p>
                <img
                  className="weather-icon"
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
              </li>
              <li>
                Temperature{" "}
                <span className="temp">
                  {Math.round(weather.main.temp)}°C (
                  {weather.weather[0].description})
                </span>
              </li>
              <li>
                Humidity <span className="temp">{weather.main.humidity}%</span>
              </li>
              <li>
                Visibility <span className="temp">{weather.visibility} m</span>
              </li>
              <li>
                Wind Speed{" "}
                <span className="temp">{weather.wind.speed} Km/h</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Forcast;
