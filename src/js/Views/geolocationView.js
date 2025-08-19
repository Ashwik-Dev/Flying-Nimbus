import View from './view.js';

class GeoLocationView extends View {
    _parentElement = document.getElementById('get-geolocation');

    addHandlerGeoLocation(handler) {
        this._parentElement.addEventListener('click', handler);
    }
};

export default new GeoLocationView();