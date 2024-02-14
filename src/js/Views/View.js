import icons from '../../img/icons.svg';

export default class View {
  _data;
  _parentEl;
  _message;
  _homePage = document.querySelector('.movie__home__page');
  _infoPage = document.querySelector('.movie__info__box');

  _render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this._renderMessage();

    this._data = data;
    this._clear();
    this._generateMarkup();
  }

  _clear() {
    this._parentEl.innerHTML = '';
  }

  _layoutReset(show) {
    if (show === 'home') {
      this._infoPage.style.display = 'none';
      this._homePage.style.display = 'grid';
    }

    if (show === 'info') {
      this._infoPage.style.display = 'inline-block';
      this._homePage.style.display = 'none';
    }
  }

  _renderMessage(message = this._errorMessage) {
    const markup = `<div class="error">
              <span class="error__icon">
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
              </span>
              <h2 class="error__message">${message}</h2>
            </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }

  loadSpinner() {
    const markup = `
                <div class="spinner__container">
              <svg>
                <use href="${icons}#loader"></use>
              </svg>
            </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}
