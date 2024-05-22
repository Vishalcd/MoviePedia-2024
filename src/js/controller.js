import ResultView from './Views/resultView';
import SortingView from './Views/sortingView';
import SearchView from './Views/searchView';
import PaginationView from './Views/paginationView';
import MovieView from './Views/movieView';
import BookmarkView from './Views/bookmarkView';

import * as model from './model';

async function controlResult() {
  try {
    // load spinner
    ResultView.loadSpinner();

    // laod data from api
    await model.loadMovies();

    // load bookmarks
    BookmarkView._render(model.state.bookmarks);

    // get data from state
    const { movies } = model.state;

    // /rander data to ui
    ResultView._render(movies);

    // render btn
    PaginationView._render(model.state);
  } catch (error) {
    console.error(error);
  }
}

function controlSorting(sort) {
  // sort available data
  if (sort === 'all') {
    PaginationView._render(model.state);
    ResultView._render(model.state.movies);
    return;
  }
  // set data to var
  const data = model.sortBy(sort);

  //re run view
  ResultView._render(data);

  // render btn
  PaginationView._render(model.state);
}

async function controlSearch(query) {
  try {
    // load spinner
    ResultView.loadSpinner();

    // fetch movies
    await model.search(query);

    // set sort method
    model.sortBy('all');
    SortingView.resetSortBtn;

    // render to page
    ResultView._render(model.state.movies);

    // render btn
    PaginationView._render(model.state);

    // add btn to remove ele
  } catch (error) {
    console.log(error);
  }
}

async function controlPagination() {
  try {
    // fatch data
    await model.pagination();

    // set sort method
    model.sortBy('all');
    SortingView.resetSortBtn;

    // render to page
    ResultView.renderNew(model.state.movies);

    // render btn
    PaginationView._render(model.state);
  } catch (error) {
    console.log(error);
  }
}

async function controlShowMovie(id) {
  try {
    // load spinner
    MovieView.loadSpinner();

    // fetch data
    await model.showMovie(id);

    // set sort method
    // model.sortBy('all');
    // SortingView.resetSortBtn;

    // render to movie page
    MovieView._render(model.state.movieData);

    // re render bookmarks
    BookmarkView._render(model.state.bookmarks);
  } catch (error) {
    console.log(error);
  }
}

function controlBookmark(movieID) {
  // set to state new bookmark
  model.setBookmark(movieID);

  // render OR re render bookmark
  MovieView._render(model.state.movieData);

  // render bookmarks on new bookmark
  BookmarkView._render(model.state.bookmarks);
}

const init = function () {
  controlResult();
  SortingView.addHandlerSorting(controlSorting);
  SearchView.addHandlerSearch(controlSearch);
  PaginationView.addHandlerPagination(controlPagination);
  MovieView.addHandlerShowMovie(controlShowMovie);
  BookmarkView.addHandlerBookmark(controlBookmark);
};
init();
