const API_KEY = '04c35731a5ee918f014970082a0088b1';
const API_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=`;
const API_URL_NOW_PLAYING = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=`;
const API_URL_TOP_RATED = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=`;
const API_URL_DETAIL = `https://api.themoviedb.org/3/movie/`;
const API_URL_SEARCH = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`;
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280/';

export {
    API_KEY,
    API_URL,
    API_URL_NOW_PLAYING,
    API_URL_TOP_RATED,
    API_URL_DETAIL,
    API_URL_SEARCH,
    IMG_PATH,
};