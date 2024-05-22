import icons from '../../img/icons.svg';
import noImage from '../../img/no-image.png';
import View from './View';

class ResultView extends View {
  _data;
  _parentEl = document.querySelector('.movies__grid');
  _message = '';
  _errorMessage = 'We could not find any title. Please try again.';

  renderNew(data) {
    this._data = data;
    this._generateMarkup('beforeend');
  }

  _generateMarkup(location = 'afterbegin') {
    console.log(`${this._data[4].primaryImage?.url}`.split('.jpg')[0].concat('SX130.jpg'));
    const markup = this._data
      .map((data) => {
        return `<!-- movie card -->
            <figure class="movie">
              <div class="movie__card">
                <a href="#${data.id}" class="movie__link">
                  <div class="movie__cover__container">
                    <img src="${data.primaryImage?.url.split('.jpg')[0].concat('SX200.jpg')}" alt="${
          data.originalTitleText.text
        }" onerror="this.src='${noImage}'" "/>
                  </div>

                  <div class="movie__info__container">
                    <div class="movie__info__container__rating">
                      <span class="movie__info__container__rating--icon">
                        <svg>
                          <use href="${icons}#film"></use>
                        </svg>
                      </span>

                      <span class="movie__info__container__rating--text">${data.titleType.text}</span>
                    </div>
                    <div class="movie__info__container__release">
                      <span class="movie__info__container__release--text">${data.releaseDate?.year}</span>
                    </div>
                  </div>
                </a>
              </div>

              <figcaption class="movie__title">
                <a href="#${data.id}" class="movie__title__link"><h2>${data.originalTitleText.text}</h2></a>
              </figcaption>
            </figure>
            <!-- movie card -->`;
      })
      .join('');
    this._parentEl.insertAdjacentHTML(location, markup);
  }
}

export default new ResultView();
