import View from "./view.js";

class SideBarView extends View {
  _parentElement = document.querySelector(".sidebar");
  _displayElement = this._parentElement.querySelector("[data-location]");

  _renderForecast() {
    this._renderIcons();
    const location = `${this._data.location.city}, ${this._data.location.region}, ${this._data.location.country}`;
    const temp = Math.round(
      this._renderDegScale(this._data.tempC, this._data.tempF)
    );
    const tempDeg = this._renderDegScale("C", "F");
    const minTemp = Math.round(
      this._renderDegScale(this._data.minTempC, this._data.minTempF)
    );
    const maxTemp = Math.round(
      this._renderDegScale(this._data.maxTempC, this._data.maxTempF)
    );

    this._updateElements([
      { selector: "[data-location]", content: location },
      { selector: "[data-currTemp]", content: temp },
      { selector: "[data-tempDeg]", content: tempDeg },
      { selector: "[data-weekday]", content: this._data.location.curWeekDay },
      { selector: "[data-time]", content: this._data.location.curTime },
      { selector: "[data-climate-des]", content: this._data.des },
      { selector: "[data-mintemp]", content: minTemp },
      { selector: "[data-maxtemp]", content: maxTemp },
      { selector: "[data-sunrise]", content: this._data.sunrise },
      { selector: "[data-sunset]", content: this._data.sunset },
    ]);
  }
}

export default new SideBarView();
