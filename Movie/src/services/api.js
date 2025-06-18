const API_KEY = "c58361aae51aea24179a1987f2d88a05";
const BASE_URL = "https://api.themoviedb.org/3";

function buildQuery(params) {
    return Object.entries(params)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
}

export const getPopularMovies = async ({ page = 1, sort_by = "popularity.desc" } = {}) => {
    const query = buildQuery({ api_key: API_KEY, page, sort_by });
    const response = await fetch(
        `${BASE_URL}/movie/popular?${query}`
    );
    const data = await response.json();
    return data;
}

export const getSearchMovie = async (query, { page = 1 } = {}) => {
    const q = buildQuery({ api_key: API_KEY, query, page });
    const response = await fetch(
        `${BASE_URL}/search/movie?${q}`
    );
    const data = await response.json();
    return data;
}

// Fetch the list of movie genres
export const getGenres = async () => {
    const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
    );
    const data = await response.json();
    return data.genres;
}

// Fetch movies by genre ID
export const getMoviesByGenre = async (genreId, { page = 1, sort_by = "popularity.desc" } = {}) => {
    const query = buildQuery({ api_key: API_KEY, with_genres: genreId, page, sort_by });
    const response = await fetch(
        `${BASE_URL}/discover/movie?${query}`
    );
    const data = await response.json();
    return data;
}

export const getTopRatedMovies = async ({ page = 1, sort_by = "vote_average.desc" } = {}) => {
    const query = buildQuery({ api_key: API_KEY, page, sort_by });
    const response = await fetch(
        `${BASE_URL}/movie/top_rated?${query}`
    );
    const data = await response.json();
    return data;
}

export const getNowPlayingMovies = async ({ page = 1, sort_by = "popularity.desc" } = {}) => {
    const query = buildQuery({ api_key: API_KEY, page, sort_by });
    const response = await fetch(
        `${BASE_URL}/movie/now_playing?${query}`
    );
    const data = await response.json();
    return data;
}

export const getUpcomingMovies = async ({ page = 1, sort_by = "popularity.desc" } = {}) => {
    const query = buildQuery({ api_key: API_KEY, page, sort_by });
    const response = await fetch(
        `${BASE_URL}/movie/upcoming?${query}`
    );
    const data = await response.json();
    return data;
}