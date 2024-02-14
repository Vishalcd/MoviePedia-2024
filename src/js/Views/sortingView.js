class SortingView {
  _parentEl = document.querySelector('.sorting');
  _errorMessage = 'We could not find any movie. Please try again.';

  addHandlerSorting(handler) {
    this._parentEl.addEventListener('click', (e) => {
      // find curr btn
      const btn = e.target.closest('.sorting__btn');
      if (!btn) return;

      // reset sort btn
      this.resetSortBtn();

      // add css styling to crr btn
      btn.classList.add('sorting__btn--active');

      // select sort method
      const sortBy = btn.dataset.filter.split(' ')[0];

      // set params
      // const params = new URLSearchParams(window.location.search);
      // params.set('sort', sortBy);
      // window.location.search = params;

      // call handler
      handler(sortBy);
    });
  }

  resetSortBtn() {
    const allBtn = document.querySelectorAll('.sorting__btn');

    allBtn.forEach((btn) => {
      btn.classList.remove('sorting__btn--active');
    });
  }
}

export default new SortingView();
