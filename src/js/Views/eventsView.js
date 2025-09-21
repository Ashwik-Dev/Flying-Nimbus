import View from "./view.js";
import * as helpers from "../helpers.js";

class EventsView extends View {
  _parentElement = document.querySelector(".forecast-container");

  _renderForecast() {
    const index = this._data.realHour;
    
    const uvIndex = Math.trunc(this._data.uvIndex[index]);
    const windSpeed = this._data.windSpeed[index];
    const windDirection = helpers.getWindDirections(this._data.windDirection[index]);
    const visibility = Math.round(this._data.visibility[index] * 0.001);
    const cloud = this._data.cloud[index];
    const precip = this._data.precip[index];
    const humidity = this._data.humidity[index];
    const { aqi, category: aqiCategory } = helpers.getAirQualityDescription(this._data.aqi.pm2_5[index]);
    const tempScale = this._data.tempScale === "C" ? "C" : "F";

    let feelsLike;
    if(tempScale === "C") {
      feelsLike = Math.round(this._data.feelsLikeC[index]) - 1;
    } else {
      feelsLike = Math.round(helpers.convertCtoF(this._data.feelsLikeC[index])) - 1;
    }
    const feelsLikeDeg = helpers.getFeelsLikeDescription(feelsLike, tempScale);

    this._updateElements([
      { selector: "[data-feelslike]", content: `${feelsLike}°` },
      { selector: "[data-tempDeg]", content: tempScale },
      { selector: "[data-feelslike-des]", content: feelsLikeDeg },
      { selector: "[data-uv-index]", content: uvIndex },
      {
        selector: "[data-uv-index-des]",
        content: helpers.getUVIndexDescription(uvIndex),
      },
      { selector: "[data-wind-speed]", content: windSpeed },
      { selector: "[data-wind-dir]", content: windDirection },
      { selector: "[data-cloud]", content: cloud },
      {
        selector: "[data-cloud-des]",
        content: helpers.getCloudCoverDescription(cloud),
      },
      { selector: "[data-precip]", content: precip },
      {
        selector: "[data-precip-des]",
        content: helpers.getPrecipitationDescription(precip),
      },
      { selector: "[data-vis]", content: visibility },
      {
        selector: "[data-vis-des]",
        content: helpers.getVisibilityDescription(visibility),
      },
      { selector: "[data-humidity]", content: humidity },
      {
        selector: "[data-humidity-des]",
        content: helpers.getHumidityDescription(humidity),
      },
      { selector: "[data-aqi-us]", content: aqi },
      { selector: "[data-aqi-us-des]", content: aqiCategory },
    ]);
  }
}

export default new EventsView();
