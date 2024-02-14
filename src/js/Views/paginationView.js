import View from './View';

import icons from '../../img/icons.svg';

class PaginationView extends View {
  _data;
  _parentEl = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.pagination__btn');

      //   guard claus
      if (!btn) return;

      this._clear();
      this._parentEl.innerHTML = `<div class="loading__loadmore">
              <svg>
                <use href="${icons}#loader"></use>
              </svg>
            </div>`;

      handler();
    });
  }

  _generateMarkup() {
    //this._data.sort !== 'all'
    if (this._data.result.length < 20) return;

    const markup = `<button class="pagination__btn pagination__btn--left">
              <span class="pagination__btn__text">Load more</span>
              <span class="pagination__btn__icon">
                <svg>
                  <use href="${icons}#down"></use>
                </svg>
              </span>
            </button>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new PaginationView();
