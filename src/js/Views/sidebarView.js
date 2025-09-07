import View from "./view.js";
import * as helpers from "../helpers.js";


class SideBarView extends View {
  _parentElement = document.querySelector(".sidebar");
  _displayElement = this._parentElement.querySelector("[data-location]");

  _renderForecast() {
    this._renderIcons();

    const currentHour = this._data.realHour;
    const location = `${this._data.location.city}, ${this._data.location.region}, ${this._data.location.country}`;
    const tempDeg = this._data.tempScale === "C" ? "C" : "F";

    let minTemp, maxTemp, temp;
    if(tempDeg === "C") {
      minTemp = Math.round(this._data.minTempC[0]);
      maxTemp = Math.round(this._data.maxTempC[0]);
      temp = Math.round(this._data.tempC80[currentHour]);
    } else {
      minTemp = Math.round(helpers.convertCtoF((this._data.minTempC[0])));
      maxTemp = Math.round(helpers.convertCtoF((this._data.maxTempC[0])));
      temp = Math.round(helpers.convertCtoF((this._data.tempC80[currentHour])));
    }
    
    const locationTime = helpers.getTimeIn12HourFormat(
      this._data.location.curTime
    );
    const sunrise = helpers.getTimeIn12HourFormat(
      this._data.sunrise[0].split("T")[1]
    );
    const sunset = helpers.getTimeIn12HourFormat(
      this._data.sunset[0].split("T")[1]
    );
    const isDay = helpers.getIsDayBool(this._data.isDay[currentHour]);

    const { description, icon } = helpers.getWeatherDetails(
      this._data.weatherCode[currentHour],
      isDay
    );

    const {description: desc2, icon: icon2} = helpers.getWeatherDetails(
      this._data.dailyWeatherCode[0],
      true
    );

    this._updateElements([
      { selector: "[data-location]", content: location },
      { selector: "[data-currTemp]", content: temp },
      { selector: "[data-tempDeg]", content: tempDeg },
      {
        selector: "[data-weekday]",
        content: helpers.getLongWeekDays[this._data.location.curWeekDay],
      },
      { selector: "[data-time]", content: locationTime },
      { selector: "[data-climate-des]", content: description },
      {selector: ".event--icon", content: icon, attribute: "src"},
      {selector: ".main__event--icon", content: icon2, attribute: "src"},
      { selector: "[data-mintemp]", content: minTemp },
      { selector: "[data-maxtemp]", content: maxTemp },
      { selector: "[data-sunrise]", content: sunrise },
      { selector: "[data-sunset]", content: sunset },
    ]);
  }
}

export default new SideBarView();
