import View from './View';
import icons from '../../img/icons.svg';
import noImage from '../../img/no-image.png';

const humanizeDuration = require('humanize-duration');
const shortEnglishHumanizer = humanizeDuration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'y',
      mo: () => 'mo',
      w: () => 'w',
      d: () => 'd',
      h: () => 'h',
      m: () => 'm',
      s: () => 's',
      ms: () => 'ms',
    },
  },
});

class MovieView extends View {
  _data;
  _parentEl = document.querySelector('.movie__info__box');
  _resultPage = document.querySelector('.movie__home__page');
  _currWindowLocation = {
    x: 0,
    y: 0,
  };

  addHandlerShowMovie(handler) {
    ['hashchange', 'load'].forEach((event) => {
      window.addEventListener(event, (e) => {
        const id = window.location.hash.slice(1);

        if (!id) return;
        handler(id);

        // change style
        this._layoutReset('info');

        // set previous scrool position
        this._currWindowLocation.x = window.scrollX;
        this._currWindowLocation.y = window.scrollY;

        // scrool to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      });
    });
  }

  _render(data) {
    this._data = data;

    const markup = `<div class="box__controls">
            <button class="btn__back">
              <span class="btn__back__svg">
                <svg>
                  <use href="${icons}#arrow-back"></use>
                </svg>
              </span>
              <span class="btn__back__text">Back</span>
            </button>

            <div class="movie__main__box">
              <div class="movie__main__box--top">
                <img
                  src="${this._data.moviePoster}"
                  alt="dummy"
                  class="movie__main__box__img"
                  onerror="this.src='${noImage}'"
                />
                <div class="movie__main__box__heading">
                  <h2 class="movie__main__box__heading--h2">
                    <span class="movie__main__box__heading--icon">
                      <svg>
                        <use href="${icons}#film"></use>
                      </svg>
                    </span>
                    ${this._data.title}
                  </h2>
                  <button class="btn-bookmark movie__main__box__heading--bookmark">
                    <svg>
                      <use href="${icons}#bookmark${this._data.bookmark ? '' : '-outline'}"></use>
                    </svg>
                  </button>
                </div>
                <div class="movie__main__box__info__more">
                  <ul class="movie__main__box__info__more--list">
${this._data.genere.map((genere) => `<li>${genere.text}</li>`).join(' ')}
                  </ul>
                  <div class="movie__main__box__info__more--details">
                    <h3>Ratings <span>${this._data.rating || 'Not found'}</span></h3>
                    <p>•</p>
                    <h3>Release Year <span>${this._data.releaseYear}</span></h3>
                    <p>•</p>
                    <h3>Length <span>${
                      +this._data.runtime ? shortEnglishHumanizer(+this._data.runtime * 1000) : 'Not Found'
                    }</span></h3>
                  </div>

                  <div class="movie__main__box__info__more--cast">
                    <h3>Starring</h3>
                    <p>${this._data.cast.map((cast) => cast).join(', ')}</p>
                  </div>

                  <div class="movie__main__box__info__more--cast">
                    <h3>Director</h3>
                    <p>${this._data.director}</p>
                  </div>

                  <div class="movie__main__box__info__more--plot">
                    <div class="movie__main__box__info__more--heading"><h2>Plot</h2></div>
                    <p>
                      ${this._data.plot || 'No Plot Founds.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="app__settings app__settings--movie-info">
              <div class="page__info">
                <h2 class="page__info__heading--gradient">${
                  this._data.iframeId ? 'Trailer &amp; Images' : this._data.images.length === 0 ? '' : `Images`
                }</h2>
              </div>
            </div>

            <div class="movie__info__image__grid">
            ${this._data.images.map((img, i) => ` <img src="${img}" alt="${this._data.title}-${i + 1}" />`).join(' ')}
              

              ${
                this._data.iframeId
                  ? `<div class="movie__info__image__grid__iframe">
                <iframe
                  src="https://www.imdb.com/video/imdb/${this._data.iframeId}/imdb/embed?autoplay=false&amp;width=480"
                  width="480"
                  height="270"
                  allowfullscreen="true"
                  mozallowfullscreen="true"
                  webkitallowfullscreen="true"
                  frameborder="no"
                  scrolling="no"
                  __idm_id__="3973122"
                ></iframe>
              </div>`
                  : ''
              }
            </div>

            <div class="movie__info__link__box">
              <h3>Read More</h3>
              <p>
                Get More info About this ${this._data.titleType} <span>${
      this._data.title
    }</span>. on IMDB Official Website.
              </p>

              <button class="movie__info__link__box__btn">
                <a href="https://www.imdb.com/title/${this._data.id}/" target="_blank">
                  <span>Vist Page</span>
                  <span class="movie__info__link__box__btn--icon">
                    <svg class="right__icon">
                      <use href="${icons}#arrow-forward"></use>
                    </svg>
                  </span>
                </a>
              </button>
            </div>
          </div>`;

    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);

    // set title
    document.title = this._data.title || 'MoviePedia';

    // btn back
    const btnBack = document.querySelector('.btn__back');
    btnBack.addEventListener('click', (e) => {
      // reset id
      window.location.hash = '';

      // clean movie data
      this._clear();

      // scrool to pevious location
      window.scrollTo({
        top: this._currWindowLocation.y,
        left: this._currWindowLocation.x,
      });

      // reset style
      this._layoutReset('home');

      // reset title
      document.title = 'MoviePedia // Get movies info';
    });
  }
}

export default new MovieView();
