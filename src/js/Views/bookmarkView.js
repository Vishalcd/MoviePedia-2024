import icons from '../../img/icons.svg';
import noImage from '../../img/no-image.png';
import View from './View';

class bookmarkView extends View {
  _parentEl = document.querySelector('.bookmark__container__ul');
  _data;

  addHandlerBookmark(handler) {
    const btnContainer = document.querySelector('.movie__info__box');

    btnContainer.addEventListener('click', (e) => {
      const bookmarkBtn = e.target.closest('.btn-bookmark');

      //   guard clause
      if (!bookmarkBtn) return;

      //   create bookmark
      const movieId = window.location.hash.slice(1);

      handler(movieId);
    });
  }

  _render(data) {
    this._data = data;

    const crrMovie = window.location.hash.slice(1);

    const markup = `${
      this._data
        ?.map((movie) => {
          return `<li class="${movie.id === crrMovie && 'bookmark__active'}">
          <a href="#${movie?.id}">
            <img src="${movie?.moviePoster}" alt="${movie.title}" onerror="this.src='${noImage}'"/>
            <div class="bookmark__container__ul__content">
              <h2>${movie.title}</h2>
              <p>
                <svg>
                  <use href="${icons}#film"></use>
                </svg>
                <span>${movie.titleType}</span>
              </p>
            </div>
          </a>
        </li>`;
        })
        .join(' ') ||
      `<div class="error">
              <span class="error__icon">
                <svg>
                  <use href="${icons}#ban-outline"></use>
                </svg>
              </span>
              <h2 class="error__message">No Bookmarks Founds!</h2>
            </div>`
    }`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

export default new bookmarkView();
