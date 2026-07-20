import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { fetchHomeMovies } from "../services/movieService";
import { fetchFavorites } from "../services/favoriteService";
import { fetchRecommendations } from "../services/recommendationService";

const imageUrl = (path) =>
  path
    ? `https://image.tmdb.org/t/p/w500${path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

const SkeletonCard = () => (
  <div className="animate-pulse overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900">
    <div className="h-72 w-full bg-zinc-800" />
    <div className="p-3">
      <div className="h-4 w-3/4 rounded bg-zinc-800" />
    </div>
  </div>
);

const Section = ({ title, items, loading }) => (
  <section className="mb-10">
    <div className="mb-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
    </div>

    {loading ? (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    ) : items?.length ? (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-6">
        {items.slice(0, 12).map((movie) => (
          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            className="group overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-red-600"
          >
            <img
              src={imageUrl(movie.poster_path)}
              alt={movie.title || movie.name}
              className="h-72 w-full object-cover"
            />

            <div className="p-3">
              <p className="text-sm font-medium text-white">
                {movie.title || movie.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    ) : (
      <p className="text-sm text-zinc-500">
        No movies available right now.
      </p>
    )}
  </section>
);

const HomePage = () => {
  const dispatch = useDispatch();

  const {
    trending,
    popular,
    topRated,
    nowPlaying,
    personalizedMovies,
    loading,
  } = useSelector((state) => state.movies);

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [selectedCategory, setSelectedCategory] = useState("trending");

const categoryMap = {
  trending,
  popular,
  topRated,
  nowPlaying,
  ...(isAuthenticated ? { recommended: personalizedMovies } : {}),
};

const displayedMovies = categoryMap[selectedCategory] || [];

useEffect(() => {
  fetchHomeMovies(dispatch);

  if (isAuthenticated) {
    fetchFavorites(dispatch);
    fetchRecommendations(dispatch);
  }
}, [dispatch, isAuthenticated]);

 return (
  <div>
    {/* Hero */}
    <div className="mb-10 rounded-2xl border border-zinc-800 bg-gradient-to-r from-zinc-900 to-zinc-800 p-8">
      <h1 className="text-3xl font-semibold text-white">
        Discover your next favorite movie
      </h1>

      <p className="mt-2 max-w-2xl text-zinc-400">
        Browse trending, popular, top-rated and personalized
        recommendations.
      </p>
    </div>

    {/* Category Filters */}
    <div className="mb-8 flex flex-wrap gap-3">
      <button
        onClick={() => setSelectedCategory("trending")}
        className={`rounded-full px-5 py-2 font-medium transition ${
          selectedCategory === "trending"
            ? "bg-red-600 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
      >
        🔥 Trending
      </button>

      <button
        onClick={() => setSelectedCategory("popular")}
        className={`rounded-full px-5 py-2 font-medium transition ${
          selectedCategory === "popular"
            ? "bg-red-600 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
      >
        ⭐ Popular
      </button>

      <button
        onClick={() => setSelectedCategory("topRated")}
        className={`rounded-full px-5 py-2 font-medium transition ${
          selectedCategory === "topRated"
            ? "bg-red-600 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
      >
        🎬 Top Rated
      </button>

      <button
        onClick={() => setSelectedCategory("nowPlaying")}
        className={`rounded-full px-5 py-2 font-medium transition ${
          selectedCategory === "nowPlaying"
            ? "bg-red-600 text-white"
            : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
        }`}
      >
        🍿 Now Playing
      </button>

      {isAuthenticated && (
        <button
          onClick={() => setSelectedCategory("recommended")}
          className={`rounded-full px-5 py-2 font-medium transition ${
            selectedCategory === "recommended"
              ? "bg-red-600 text-white"
              : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
          }`}
        >
          🎯 Recommended For You
        </button>
      )}
    </div>

    {/* Movies */}
    <Section
      title={
        selectedCategory === "trending"
          ? "🔥 Trending Movies"
          : selectedCategory === "popular"
          ? "⭐ Popular Movies"
          : selectedCategory === "topRated"
          ? "🎬 Top Rated Movies"
          : selectedCategory === "nowPlaying"
          ? "🍿 Now Playing"
          : "🎯 Recommended For You"
      }
      items={displayedMovies}
      loading={loading}
    />
  </div>
);
};

export default HomePage;