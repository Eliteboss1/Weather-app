import "./weather.css";
import React, { useEffect, useState } from "react";

export default function Weather() {
  const [weatherData, setWeather] = useState({});
  const [locations, setLocations] = useState("");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        cloud(`${latitude}/${longitude}`);
      });
    } else {
      alert("Geolocation not available");
    }
  }, []);

  function cloud(latLong) {
    const url = !latLong.includes("/")
      ? `https://api.openweathermap.org/data/2.5/weather?q=${latLong}&units=metric&APPID=1458ec41da2032f844e3e770089c25f9`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${
          latLong.split("/")[0]
        }&lon=${
          latLong.split("/")[1]
        }&units=metric&APPID=1458ec41da2032f844e3e770089c25f9`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
          }
        }
      })
      .then((object) => setWeather(object));
  }

  return (
    <body className="body">
      <div className="weather">
        <div className="container">
          <div className="weatherInput">
            <div className="country">
              <span className="cou">{weatherData?.sys?.country}</span>
            </div>
            <input
              type="text"
              name="display"
              value={locations}
              onChange={(e) => {
                setLocations(e.target.value);
                cloud(e.target.value);
              }}
              id="input_weather"
              spellCheck="false"
            />

            <div className="main">
              <div className="degree">
                <img
                  src={`https://openweathermap.org/img/w/${
                    weatherData.weather ? weatherData.weather[0].icon : "10d"
                  }.png`}
                  alt="wthr img"
                />

                <span className="deg">
                  {weatherData?.main?.temp}
                  °C
                </span>
                <img
                  src={`https://openweathermap.org/img/w/${
                    weatherData.weather ? weatherData.weather[0].icon : "10d"
                  }.png`}
                />
              </div>
              <div className="Weather_condition">
                {console.log(weatherData)}
                {weatherData.weather && weatherData.weather[0].description}
                <div className="outer"></div>
                <div className="outer">
                  Pressure: {weatherData?.main?.pressure}
                </div>
                <div className="outer">
                  Humidity: {weatherData?.main?.humidity}
                </div>
                <div className="outer">Timezone: {weatherData?.timezone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
