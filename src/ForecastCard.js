// ForecastCard.js
import React from "react";
import ReactAnimatedWeather from "react-animated-weather";

const defaults = {
  color: "white",
  size: 40, // Icon size similar to attached image
  animate: true,
};

const ForecastCard = ({ day, high, low, icon }) => {
  return (
    <div className="forecast-card">
      <div className="day">{day}</div>
      <ReactAnimatedWeather
        icon={icon}
        color={defaults.color}
        size={defaults.size}
        animate={defaults.animate}
      />
      <div className="temp-container">
        <div className="high-temp">{high}°C</div>
        <div className="low-temp">{low}°C</div>
      </div>
    </div>
  );
};

export default ForecastCard;
