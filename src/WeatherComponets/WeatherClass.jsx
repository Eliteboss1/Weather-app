import React from "react";
import "./weather.css";

export default class Weather extends React.Component {
  cloud(latLong) {
    const url = !latLong.includes("/")
      ? `https://api.openweathermap.org/data/2.5/weather?q=${latLong}&units=metric&APPID=1458ec41da2032f844e3e770089c25f9`
      : `https://api.openweathermap.org/data/2.5/weather?lat=${
          latLong.split("/")[0]
        }&lon=${
          latLong.split("/")[1]
        }&units=metric&APPID=1458ec41da2032f844e3e770089c25f9`;
    fetch(url)
      .then((res) => {
        console.log(res);
        if (res.ok) {
          console.log(res.status);
          return res.json();
        } else {
          if (res.status === 404) {
          }
        }
      })
      .then((object) => this.setState({ ...this.state, weatherData: object }));
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        this.cloud(`${latitude}/${longitude}`);
      });
    } else {
      alert("Geolocation not available");
    }
  }

  constructor() {
    super();
    this.state = {
      weatherData: { weather: [] },
      locations: "",
    };
  }

  render() {
    return (
      <body className="body">
        <div className="weather">
          <div className="container">
            <div className="weatherInput">
              <div className="country">
                <span className="cou">
                  {this.state.weatherData?.sys?.country}
                </span>
              </div>
              <input
                type="text"
                name="display"
                value={this.state.locations}
                onChange={(e) => {
                  this.setState({ ...this.state, locations: e.target.value });
                  this.cloud(e.target.value);
                }}
                id="input_weather"
                spellCheck="false"
              />

              <div className="main">
                <div className="degree">
                  {console.log(this.state)}
                  <img
                    src={`https://openweathermap.org/img/w/${
                      this.state.weatherData?.weather.length > 0
                        ? this.state.weatherData.weather[0].icon
                        : "10d"
                    }.png`}
                    alt="wthr img"
                  />

                  <span className="deg">
                    {this.state.weatherData?.main?.temp}
                    °C
                  </span>
                  <img
                    src={`https://openweathermap.org/img/w/${
                      this.state.weatherData?.weather.length > 0
                        ? this.state.weatherData.weather[0].icon
                        : "10d"
                    }.png`}
                  />
                </div>
                <div className="Weather_condition">
                  {this.state.weatherData?.weather.length > 0 &&
                    this.state.weatherData.weather[0].description}
                  <div className="outer"></div>
                  <div className="outer">
                    Pressure: {this.state.weatherData?.main?.pressure}
                  </div>
                  <div className="outer">
                    Humidity: {this.state.weatherData?.main?.humidity}
                  </div>
                  <div className="outer">
                    Timezone: {this.state.weatherData?.timezone}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    );
  }
}
