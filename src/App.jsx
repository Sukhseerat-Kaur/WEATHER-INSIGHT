import "./App.css";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";

function App() {
  const [cityData, setCityData] = useState(null);
  const [cityInput, setcityInput] = useState("Delhi");

  const updateCityData = () => {
    setcityInput("");

    fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6a8bb66a242f4e1889382727211608&q=${cityInput}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCityData(data);
      });
  };
  useEffect(() => {
    updateCityData();
  }, []);

  if (!cityData) {
    return <div>loading</div>;
  }
  return cityData.location ? (
    <div
      className={
        cityData.current.is_day
          ? cityData.current.condition.text === "Sunny"
            ? "App day sunny"
            : cityData.current.condition.text === "Partly cloudy"
            ? "App day partially-cloudy"
            : cityData.current.condition.text === "Cloudy"
            ? "App day cloudy"
            : cityData.current.condition.text === "Patchy light rain" ||
              cityData.current.condition.text ===
                "Moderate or heavy rain shower" ||
              cityData.current.condition.text === "Moderate rain" ||
              cityData.current.condition.text === "Patchy rain possible"
            ? "App day rainy"
            : "App day partially-cloudy"
          : cityData.current.condition.text === "Partly cloudy" ||
            cityData.current.condition.text === "Cloudy"
          ? "App night cloudy"
          : cityData.current.condition.text === "Patchy light rain" ||
            cityData.current.condition.text ===
              "Moderate or heavy rain shower" ||
            cityData.current.condition.text === "Moderate rain" ||
            cityData.current.condition.text === "Patchy rain possible"
          ? "App night rainy"
          : "App night"
      }
    >
      <div className="header">
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setcityInput(e.target.value)}
          value={cityInput}
          onKeyPress={(e) => {
            e.charCode === 13 ? updateCityData() : setcityInput(e.target.value);
          }}
        />
      </div>
      <Card cityData={cityData} />
    </div>
  ) : (
    <h2>Place not found</h2>
  );
}

export default App;
