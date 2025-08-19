import View from "./view.js";

class LocationView extends View {
  _parentElement = document.getElementById("input__city");

  getQuery() {
    const query = this._parentElement.value.toLowerCase().trim();
    this._parentElement.value = "";
    this._parentElement.blur();
    return query;
  }

  addHandlerLocation(handler) {
    document
      .querySelector(".navbar__search")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const cityName = this.getQuery();
        if (!cityName) return alert("Please enter the city name");
        handler(cityName);
      });
  }

  addHandler(handler) {
    document.addEventListener('DOMContentLoaded', handler);
  }
}

export default new LocationView();
