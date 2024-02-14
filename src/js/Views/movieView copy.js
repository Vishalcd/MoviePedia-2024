import View from './View';
import icons from '../../img/icons.svg';
import noImage from '../../img/no-image.png';

const humanizeDuration = require('humanize-duration');

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

        // set previous scrool position
        this._currWindowLocation.x = window.scrollX;
        this._currWindowLocation.y = window.scrollY;

        // scrool to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });

        // change style
        this._resultPage.style.display = 'none';
        this._parentEl.style.display = 'inline-block';
      });
    });
  }

  _render(data) {
    this._data = data;

    console.log(this._data);

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
                <img src="${
                  this._data.primaryImage?.url
                }" alt="dummy" class="movie__main__box__img" onerror="this.src='${noImage}'" />
                <div class="movie__main__box__heading">
                  <h2 class="movie__main__box__heading--h2">
                    <span class="movie__main__box__heading--icon">
                      <svg>
                        <use href="${icons}#film"></use>
                      </svg>
                    </span>
                    ${this._data.titleText.text}
                  </h2>
                  <button class="btn-bookmark movie__main__box__heading--bookmark">
                    <svg>
                      <use href="${icons}#bookmark${this._data.bookmark === true ? '' : '-outline'}"></use>
                    </svg>
                  </button>
                </div>
                <div class="movie__main__box__info__more">
                  <ul class="movie__main__box__info__more--list">
                  ${this._data.genres.genres
                    .map((genre) => {
                      const markup = `<li>${genre.text}</li>`;
                      return markup;
                    })
                    .join('')}
                  </ul>
                  <div class="movie__main__box__info__more--details">
                    <h3>IMDB Ratings <span>4.5</span></h3>
                    <p>&bull;</p>
                    <h3>Release Year <span>${this._data.releaseYear.year}</span></h3>
                    <p>&bull;</p>
                    <h3>Movie Length <span>${humanizeDuration(this._data.runtime?.seconds * 1000)}</span></h3>
                  </div>

                  <div class="movie__main__box__info__more--cast">
                    <h3>Starring</h3>
                    <p>Andrew Garfield, Emma Stone, Rhys Ifans</p>
                  </div>

                  <div class="movie__main__box__info__more--cast">
                    <h3>Director</h3>
                    <p>Marc Webb</p>
                  </div>

                  <div class="movie__main__box__info__more--plot">
                    <div class="movie__main__box__info__more--heading"><h2>Plot</h2></div>
                    <p>
                      ${this._data.plot?.plotText.plainText}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="app__settings app__settings--movie-info">
              <div class="page__info">
                <h2 class="page__info__heading--gradient">Trailer & Images</h2>
              </div>
            </div>
          </div>
          
          <iframe src="http://www.imdb.com/video/imdb/vi1903936793/imdb/embed?autoplay=false&width=480"  width="480" height="270" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true" frameborder="no" scrolling="no"></iframe>
`;
    this._clear();
    this._parentEl.insertAdjacentHTML('afterbegin', markup);

    // set title
    document.title = this._data.titleText.text || 'MoviePedia';

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
      this._resultPage.style.display = 'grid';
      this._parentEl.style.display = 'none';

      // reset title
      document.title = 'MoviePedia // Get movies info';
    });
  }
}

export default new MovieView();
