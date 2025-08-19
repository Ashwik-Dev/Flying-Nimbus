import View from "./view.js";
import * as helpers from "../helpers.js";

class EventsView extends View {
  _parentElement = document.querySelector(".forecast-container");

  _renderForecast() {
    const feelsLike = Math.round(
      this._renderDegScale(this._data.feelsLikeC, this._data.feelsLikeF)
    );
    const uvIndex = Math.trunc(this._data.uvIndex);
    const { windSpeed } = this._data;
    const { windDirection } = this._data;
    const { visibility } = this._data;
    const { cloud } = this._data;
    const { precip } = this._data;
    const { humidity } = this._data;
    const aqi = this._data.aqi.usIndex;
    const tempScale = this._data.tempScale === "c" ? "C" : "F";
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
      {
        selector: "[data-aqi-us-des]",
        content: helpers.getAirQualityDescription(aqi),
      },
    ]);
  }
}

export default new EventsView();
