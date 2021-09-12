import React from "react";
import { timeConvert } from "./funcTimeConvert";

const HourlyCard = ({ data }) => {
  return (
    <div className="hourly-card">
      <div className="details">
        <img src={data.condition.icon} alt="" />
        <div className="temp xx-large-font">{data.temp_c}°</div>
        <div className="condition-text">
          {/* {data.condition.text === "Light rain shower" ||
          data.condition.text === "Patchy rain possible" ||
          data.condition.text === "Patchy light rain" ||
          data.condition.text === "Moderate rain at times"
            ? "Light rain"
            : data.condition.text === "Moderate or heavy rain shower"
            ? "Rain showers"
            : data.condition.text === "Torrential rain shower"
            ? "Heavy rain"
            : data.condition.text === "Patchy light rain with thunder"
            ? "Rainy thunders"
            : data.condition.text} */}
          {data.condition.text}
        </div>
        <div className="things">
          <div className="humidity small-font">Humidity: {data.humidity}%</div>
          <div className="wind-speed small-font">
            Wind Speed: {data.wind_kph} kph
          </div>
        </div>
      </div>
      <div className="time">{timeConvert(data.time.slice(11))}</div>
    </div>
  );
};

export default HourlyCard;
