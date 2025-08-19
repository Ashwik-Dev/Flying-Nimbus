import View from "./view.js";
import * as helpers from "../helpers.js";

class WeeksView extends View {
  _parentElement = document.querySelector(".week-report--js");
  // _displayElement = document.querySelector(".")

  _renderForecast() {
    this._clear();
    const html = this._renderMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _renderMarkup() {
    return `
          <h1 class="heading-1">This Week Weather Report</h1>
          <div class="content__report--card-container">
          ${this._data.forecast
            .map(this._renderMarkupGenerator.bind(this))
            .join("")}
          </div>
    `;
  }

  _renderMarkupGenerator(data) {
    const month = helpers.getDateParts(data.date).month;
    const day = helpers.getDateParts(data.date).day;
    const weekDay = helpers.getDateParts(data.date).shortWeekDay;
    const source = data.day.condition.icon;
    const text = data.day.condition.text;
    const maxTemp = Math.round(
      this._renderDegScale(data.day.maxtemp_c, data.day.maxtemp_f)
    );
    const minTemp = Math.round(
      this._renderDegScale(data.day.mintemp_c, data.day.mintemp_f)
    );

    return `
            <div class="day__card">
                <div class="day__card--date">
                  <span>${day} ${month}</span>
                  <span>${weekDay}</span>
                </div>
                <div class="day__card--climate">
                  <img class="icon icon--gold-fill" src="${source}" alt="${text}">
                  <span>${minTemp}&deg; / ${maxTemp}&deg;</span>
                </div>
            </div>
        `;
  }
}

export default new WeeksView();
