import axios from "axios";

if (!process.env.TMDB_API_KEY) {
  throw new Error("TMDB_API_KEY is missing");
}
const tmdb = axios.create({
  baseURL: process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
});
console.log("TMDB_BASE_URL:", process.env.TMDB_BASE_URL);
console.log("TMDB_API_KEY:", process.env.TMDB_API_KEY);
// Common Request Function
const fetchData = async (url, params = {}) => {
  try {
    const response = await tmdb.get(url, { params });
    return response.data;
  } catch (error) {
    console.error("TMDB ERROR");
    console.error("URL:", url);
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);

    throw error;
  }
};

// Trending Movies
export const getTrendingMovies = async () => {
  const data = await fetchData("/trending/movie/day");
  return data.results;
};

// Popular Movies
export const getPopularMovies = async () => {
  const data = await fetchData("/movie/popular");
  return data.results;
};

// Top Rated Movies
export const getTopRatedMovies = async () => {
  const data = await fetchData("/movie/top_rated");
  return data.results;
};

// Now Playing
export const getNowPlayingMovies = async () => {
  const data = await fetchData("/movie/now_playing");
  return data.results;
};

// Search
export const searchMovies = async (query) => {
  const data = await fetchData("/search/movie", {
    query,
  });

  return data.results;
};

// Movie Details
export const getMovieDetails = async (id) => {
  return await fetchData(`/movie/${id}`, {
    append_to_response: "credits,videos,images",
  });
};

export const getUpcomingMovies = async () => {
  const data = await fetchData("/movie/upcoming");
  return data.results;
};

export const getGenres = async () => {
  const data = await fetchData("/genre/movie/list");
  return data.genres;
};

export const discoverMovies = async (params) => {
  return await fetchData("/discover/movie", params);
};