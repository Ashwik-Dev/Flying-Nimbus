import View from "./view.js";

class TempScaleView extends View {
  _parentElement = document.querySelector(".temp__box-btns");
  _slider = this._parentElement.querySelector(".slider__btn");
  _celsiusBtn = document.querySelector(".temp__btn-C");
  _fahrenheitBtn = document.querySelector(".temp__btn-F");

  addHandlerToggleScale(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".temp__btn");
      if (!btn) return;

      if (!btn.classList.contains("active")) handler();
    });
  }

  updateActiveBtn(scale) {
    if (scale === "C") {
      this._celsiusBtn.classList.add("active");
      this._fahrenheitBtn.classList.remove("active");
      this._slider.classList.remove("slide-right");
    } else {
      this._celsiusBtn.classList.remove("active");
      this._fahrenheitBtn.classList.add("active");
      this._slider.classList.add("slide-right");
    }
  }
}

export default new TempScaleView();
