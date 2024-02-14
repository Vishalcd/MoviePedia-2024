import View from './View';

class SearchView extends View {
  _data;
  _parentEl = document.querySelector('.search');

  addHandlerSearch(handler) {
    this._parentEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = document.querySelector('.search__input');

      // guard clause
      if (!query.value) return;

      // call handler
      handler(query.value);

      // set query to heading
      const heading = document.querySelector('.page__info__heading');
      heading.innerHTML = `Search related: ${query.value}`;

      // reset query
      query.value = '';

      this._layoutReset('home');
    });
  }
}

export default new SearchView();
