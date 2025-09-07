import * as model from "./model.js";
import locationView from "./Views/locationView.js";
import sidebarView from "./Views/sidebarView.js";
import weeksView from "./Views/weeksView.js";
import eventsView from "./Views/eventsView.js";
import geolocationView from "./Views/geolocationView.js";
import tempScaleView from "./Views/tempScaleView.js";

const controlGeoLocation = async function () {
  try {
    sidebarView.renderSpinner();

    const coords = await model.getCurrentLocation();

    if (!coords) throw new Error("Unable to retrieve geolocation");

    controlSearch(null, coords);
  } catch (err) {
    sidebarView.renderError(err.message);
    weeksView.restoreInitial();
    eventsView.restoreInitial();
  }
};

const controlSearch = async function (cityName, coords) {
  try {
    sidebarView.renderSpinner();
    weeksView.renderSpinner();

    const locationData = await model.getGeoLocation(
      cityName || null,
      coords || null
    );

    const data = await model.getLocation(locationData);

    sidebarView.render(data);
    weeksView.render(data);
    eventsView.render(data);
    tempScaleView.updateActiveBtn(data.tempScale);
  } catch (err) {
    console.error(err);
    sidebarView.renderError(err.message);
    weeksView.restoreInitial();
  }
};

const controlTempScale = function () {
  try {
    const data = model.toggleTempScale();

    if (!data) return;

    tempScaleView.updateActiveBtn(data.tempScale);

    sidebarView.render(data);
    weeksView.render(data);
    eventsView.render(data);
  } catch (err) {
    sidebarView.renderError(err.message);
  }
};

const init = function () {
  document.addEventListener("DOMContentLoaded", function () {
    weeksView.saveInitialMarkup();
    sidebarView.saveInitialMarkup();
    eventsView.saveInitialMarkup();
  });

  locationView.addHandlerLocation(controlSearch);
  geolocationView.addHandlerGeoLocation(controlGeoLocation);
  tempScaleView.addHandlerToggleScale(controlTempScale);
};

init();
