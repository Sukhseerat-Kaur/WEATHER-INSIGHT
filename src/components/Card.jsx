import React from "react";
import "../styles/card.css";
import HourlyCard from "./HourlyCard";
import { timeConvert } from "./funcTimeConvert";
import { useRef, useEffect } from "react";

const Card = ({ cityData }) => {
  const hourlyCardsRef = useRef(null);

  let widthHourlyCards = 0;
  useEffect(() => {
    widthHourlyCards = hourlyCardsRef.current.offsetWidth;
  }, [cityData]);

  const handleScrollButtons = (direction) => {
    if (direction === "left") {
      hourlyCardsRef.current.scrollLeft -= widthHourlyCards;
    } else {
      hourlyCardsRef.current.scrollLeft += widthHourlyCards;
    }
  };

  return (
    <div className="card">
      <div className="current">
        <div className="city-name x-large-font">
          {cityData.location.name}, {cityData.location.region}
        </div>
        <div className="temp">
          <img src={cityData.current.condition.icon} alt="condition-icon" />
          {cityData.current.temp_c}°
        </div>
        <div className="condition-text xx-large-font">
          {cityData.current.condition.text === "Light rain shower" ||
          cityData.current.condition.text === "Patchy rain possible" ||
          cityData.current.condition.text === "Patchy light rain"
            ? "Light rain"
            : cityData.current.condition.text ===
              "Moderate or heavy rain shower"
            ? "Rain showers"
            : cityData.current.condition.text}
        </div>
        <div className="updated-on">
          Updated as of {timeConvert(cityData.current.last_updated.slice(11))}
        </div>

        <div className="faltu-cheeza">
          <div className="feels-like">
            Feels Like: {cityData.current.feelslike_c}°
          </div>
          <div className="humidity">Humidity: {cityData.current.humidity}%</div>
          <div className="precipitation">
            Precipitation: {cityData.current.precip_mm} mm
          </div>
          <div className="wind-speed">
            Wind Speed: {cityData.current.wind_kph} kph
          </div>
          <div className="pressure">
            Pressure: {cityData.current.pressure_mb} mb
          </div>
          <div className="visibility">
            Visibility: {cityData.current.vis_km} km
          </div>
        </div>
      </div>
      <h2>Hourly</h2>
      <div className="hourly-update">
        <button onClick={() => handleScrollButtons("left")}>{"<"}</button>
        <div className="hourly-cards" ref={hourlyCardsRef}>
          {cityData.forecast.forecastday[0].hour.map((hourlyObj, index) => (
            <HourlyCard data={hourlyObj} key={index} />
          ))}
        </div>
        <button onClick={() => handleScrollButtons("right")}>{">"}</button>
      </div>
    </div>
  );
};

export default Card;
