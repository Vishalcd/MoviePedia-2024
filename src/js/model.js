'use strict';

import { API, OPTIONS, capitalizeFirstLetter } from './healper';

export const state = {
  movies: [],
  result: {
    length: 0,
    page: 1,
    next: null,
  },
  sort: 'all',
  searchQuery: 'random',
  movieData: {},
  bookmarks: [],
};

// get bookmarks
JSON.parse(window.localStorage.getItem('Movies')) &&
  state.bookmarks.push(...JSON.parse(window.localStorage.getItem('Movies')));

export async function loadMovies() {
  try {
    // fetch data
    const res = await fetch(`${API}/titles/random?limit=20&page=1&list=top_boxoffice_200`, OPTIONS);
    const data = await res.json();

    // set data
    const { results } = data;

    // update state
    state.movies = results;
    state.result.length = results.length;
  } catch (error) {
    console.error(error);
  }
}

export const sortBy = function (sort = state.sort) {
  const { movies } = state;

  // set sort tate
  state.sort = sort;

  const sortedData = movies?.filter((movie) => {
    return movie.titleType.id === sort;
  });

  if (sortedData.length !== 0) return sortedData;
};

export const search = async function (query) {
  try {
    // fetch data
    const res = await fetch(`${API}/titles/search/title/${query}?page=1&limit=20&exact=false`, OPTIONS);
    const data = await res.json();

    const { results } = data;

    // if (results.length === 0) throw new Error('feff');

    // update state
    state.movies = results;
    state.result.length = data.entries;
    state.result.page = +data.page + 1;
    state.searchQuery = query;
  } catch (err) {
    console.error(err);
  }
};

export const pagination = async function (query, page) {
  try {
    // fetch data
    const currQuery =
      state.searchQuery === 'random'
        ? '/titles/random?limit=20&page=1&list=top_boxoffice_200'
        : `${
            state.result.next ||
            `/titles/search/title/${state.searchQuery}?exact=false&limit=20&page=${state.result.page}`
          }`;

    const res = await fetch(`${API}${currQuery}`, OPTIONS);
    const data = await res.json();

    // set data
    if (state.searchQuery !== 'random') {
      state.result.next = data.next;
      const crrPage = state.result.next.match(/(\d+)/)[0];
      state.result.page = +crrPage;
    }
    const { results } = data;

    // console.log(data, currQuery, state, results, data.page);

    // update state
    state.movies = results;
    state.result.length = data.entries;
  } catch (error) {
    console.log(error);
  }
};

// open movies
export const showMovie = async function (id) {
  try {
    // fetch data
    // const res = await fetch(`${API}/titles/${id}?info=base_info`, OPTIONS);
    // const data = await res.json();

    // new api
    const url = `https://imdb-com.p.rapidapi.com/title/details?tconst=${id}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '091b1d4a7dmsh200a2f3d8b3127bp130c9ajsnc0104809e6e2',
        'X-RapidAPI-Host': 'imdb-com.p.rapidapi.com',
      },
    };

    const res = await fetch(url, options);
    const result = await res.json();

    const movieData = result.data;

    const newMovieData = {
      id: movieData.mainColumnData.id,
      moviePoster: movieData.aboveTheFoldData.primaryImage.url,
      title: movieData.aboveTheFoldData.titleText.text,
      genere: movieData.aboveTheFoldData.genres.genres,
      cast: movieData.mainColumnData.cast.edges.map((cast) => cast.node.name.nameText.text).slice(0, 5),
      director: movieData.mainColumnData.directors[0]?.credits[0].name.nameText.text,
      runtime: movieData.mainColumnData.runtime?.seconds,
      rating: movieData.aboveTheFoldData.ratingsSummary.aggregateRating,
      iframePoster: movieData.mainColumnData.videoStrip.edges[0]?.node.thumbnail.url,
      releaseYear: movieData.mainColumnData.releaseYear.year,
      images: movieData.mainColumnData.titleMainImages.edges
        ?.map((img) => {
          return img.node?.url;
        })
        .slice(0, 4),
      iframeId: movieData.mainColumnData.videoStrip.edges[0]?.node.id,
      titleType: capitalizeFirstLetter(movieData.mainColumnData.titleType.id),
      plot: movieData.aboveTheFoldData.plot?.plotText.plainText,
      detailLink: movieData.mainColumnData.detailsExternalLinks.edges[0]?.node.url,
    };

    // cheack bookmark status
    const bookmarkedMovie = state.bookmarks?.find((movie) => movie?.id === id);

    // set data
    state.movieData = { ...newMovieData, bookmark: bookmarkedMovie?.bookmark || false };

    // update state
  } catch (error) {
    console.log(error);
  }
};

export const setBookmark = function (movieId) {
  //get current movie
  const currMovie = state.movieData;

  // set bookmark status
  if (currMovie.bookmark === false) {
    // set bookmark state
    currMovie.bookmark = true;

    // set bookmark to state
    state.bookmarks.push(currMovie);

    //set to localstorage
    window.localStorage.setItem('Movies', JSON.stringify(state.bookmarks));
  } else if (currMovie.bookmark === true) {
    // set bookmark state
    currMovie.bookmark = false;

    // set bookmark to state
    const remainingBookmarks = state.bookmarks.filter((movie) => movie.id !== movieId);
    state.bookmarks = remainingBookmarks;

    // set to localstorage
    window.localStorage.clear();
    console.log(remainingBookmarks);
    window.localStorage.setItem('Movies', JSON.stringify(state.bookmarks));
  }
};
