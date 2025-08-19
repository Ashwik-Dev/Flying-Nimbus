export default class View {
  _data;
  _originalContent = null;

  saveInitalMarkup() {
    if (!this._initalMarkup) {
      this._initalMarkup = this._parentElement.innerHTML;
    }
  }

  render(data) {
    if (!data) return;
    this._data = data;
    this._restoreContent();
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

    climateIcon.classList.add("hidden");
    climateImg.classList.remove("hidden");

    climateImg.src = this._data.curIcon;
    climateImg.alt = this._data.curText;
  }

  renderSpinner() {
    if (!this._originalContent) {
      this._originalContent = this._parentElement.innerHTML;
    }
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

  _restoreContent() {
    if (this._originalContent) {
      const target = this._displayElement || this._parentElement;

      target.innerHTML = this._originalContent;
      this._originalContent = null;
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
      }
    });
  }

  _renderDegScale(c, f) {
    return this._data.tempScale === "c" ? c : f;
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
    this._clear();
    // this._parentElement.insertAdjacentHTML("afterBegin", markup);
    this._displayElement.insertAdjacentHTML("afterBegin", markup);
  }

  restoreIntial() {
    if (this._initalMarkup) {
      this._clear();
      this._parentElement.innerHTML = this._initalMarkup;
    }
  }

  renderMessage(message) {
    const markup = `
        <div class="error">
          <div>
            <i data-lucide="circle-x"></i>
          </div>
          <p>${message}</p>
        </div>
    `;
    this._displayElement.innerHTML = "";
    this._displayElement.insertAdjacentHTML("afterBegin", markup);
  }
}
