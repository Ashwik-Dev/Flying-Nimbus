import View from "./view.js";
import * as helpers from "../helpers.js";

class WeeksView extends View {
  _parentElement = document.querySelector(".week-report--js");

  _renderForecast() {
    this._clear();
    const html = this._renderMarkup();
    this._parentElement.insertAdjacentHTML("afterbegin", html);
  }

  _renderMarkup() {
    return `
          <h1 class="heading-1">This Week Weather Report</h1>
          <div class="content__report--card-container">
          ${this._data.date
            .map((_, index) => this._renderMarkupGenerator(this._data, index))
            .join("")}
          </div>
    `;
  }

  _renderMarkupGenerator(data, index) {
    const dateStr = new Date(data.date[index]);
    const year = dateStr.toLocaleDateString("en-US", { year: "numeric" });
    const month = dateStr.toLocaleDateString("en-US", { month: "short" });
    const day = dateStr.toLocaleDateString("en-US", { day: "2-digit" });
    const weekDay = dateStr.toLocaleDateString("en-US", { weekday: "short" });
    const { description, icon } = helpers.getWeatherDetails(
      data.dailyWeatherCode[index],
      true
    );
    const tempScale = data.tempScale === "C" ? "C" : "F";

    let maxTemp, minTemp;

    if(tempScale === "C") {
      maxTemp = Math.round(data.maxTempC[index]);
      minTemp = Math.round(data.minTempC[index]);
    } else {
      maxTemp = Math.round(helpers.convertCtoF(data.maxTempC[index]));
      minTemp = Math.round(helpers.convertCtoF(data.minTempC[index]));
    };

    return `
            <div class="day__card">
                <div class="day__card--date">
                  <span>${day} ${month}</span>
                  <span>${weekDay}</span>
                </div>
                <div class="day__card--climate">
                  <img class="icon icon--gold-fill" src="${icon}"  data-lucide="cloudy" alt="${description}" title="${description}" />
                  <span>${minTemp}&deg; / ${maxTemp}&deg;</span>
                </div>
            </div>
        `;
  }
}

export default new WeeksView();
