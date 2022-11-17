import "./weather.css";
import React, { useEffect, useState } from "react";
import { FormatAlignCenter } from "@mui/icons-material";

export default function Weather() {
  const [weather, setWeather] = useState({});
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    cloud();
  }, []);

  function cloud() {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${locations}&units=metric&APPID=1458ec41da2032f844e3e770089c25f9`
    )
      .then((res) => {
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
          }
        }
      })
      .then((object) => {
        setWeather(object);

        console.log(weather);
      });
  }

  return (
    <body className="body">
      <div className="weather">
        <div className="container">
          <div className="weatherInput">
            <input
              type="text"
              name="display"
              value={locations}
              onChange={(e) => setLocations(e.target.value)}
              onLoad={fetch(
                "https://api.openweathermap.org/data/2.5/weather?q=Nigeria&appid=1458ec41da2032f844e3e770089c25f9"
              )}
              id="input_weather"
              spellCheck="false"
              onKeyPress={cloud}
            />
          </div>

          <div className="main">
            <div className="degree">
              <FormatAlignCenter
                className="form
              t"
              />
              <span className="deg">
                {" "}
                {weather?.main?.temp}
                °C
              </span>
              <FormatAlignCenter className="format1" />
            </div>
            <div className="country">
              <span className="cou">{weather?.sys?.country}</span>
            </div>
          </div>
        </div>
      </div>
    </body>
  );
}
