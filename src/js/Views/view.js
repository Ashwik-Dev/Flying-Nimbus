/**
 *
 */

export default class View {
  _data;
  _initialMarkup;

  saveInitialMarkup() {
    if (!this._initialMarkup) {
      this._initialMarkup = this._parentElement.innerHTML;
    }
  }

  render(data) {
    if (!data) return;
    this._data = data;
    this._renderForecast();
  }

  _clear() {
    this._parentElement.innerHTML = "";
  }

  _renderIcons() {
    const climateIcon = this._parentElement.querySelector(
      "[data-climate-icon]"
    );
    const climateImg = this._parentElement.querySelector("[data-climate-img]");

    if (climateIcon && climateImg) {
      climateIcon.classList.add("hidden");
      climateImg.classList.remove("hidden");
    }
  }

  _updateElements(updates) {
    updates.forEach(({ selector, content, attribute = "textContent" }) => {
      const element = this._parentElement.querySelector(selector);
      if (element) {
        if (attribute === "textContent") {
          element.textContent = content;
        } else {
          element.setAttribute(attribute, content);
        }

        if (selector === "[data-climate-img]") {
          console.log(`Setting ${attribute} to:`, content);
          console.log(`Element found:`, element);
          console.log(`Final src value:`, element.src);
        }
      } else {
        console.log(`Element not found for selector: ${selector}`);
      }
    });
  }

  _renderDegScale(c, f) {
    return this._data.tempScale === "c" ? c : f;
  }

  renderSpinner() {
    const target = this._displayElement || this._parentElement;

    const markup = `
      <div class="spinner" id="weather-spinner">
        <i data-lucide="loader"></i>
      </div>
    `;
    target.innerHTML = "";
    target.insertAdjacentHTML("afterbegin", markup);
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  renderError(message) {
    const markup = `
        <div class="error">
          <div>
            <i data-lucide="circle-x"></i>
          </div>
          <p>${message}</p>
        </div>
    `;
    const target = this._displayElement || this._parentElement;
    target.innerHTML = "";
    target.insertAdjacentHTML("afterBegin", markup);
  }

  restoreInitial() {
    const target = this._displayElement || this._parentElement;
    if (this._initialMarkup) {
      target.innerHTML = this._initialMarkup;
    }
  }
}
