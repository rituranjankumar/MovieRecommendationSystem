import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import MovieCard from "../components/movie/MovieCard";

import {
  fetchFavorites,
  removeFavorite,
} from "../services/favoriteService";

const FavoritesPage = () => {
  const dispatch = useDispatch();

  const { items, loading } = useSelector(
    (state) => state.favorites
  );

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        await fetchFavorites(dispatch);
      } catch (error) {
        console.error(error);
      }
    };

    loadFavorites();
  }, [dispatch]);

  const handleRemoveFavorite = async (tmdbId) => {
    try {
      await removeFavorite(tmdbId, dispatch);
      toast.success("Removed from favorites");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to remove favorite"
      );
    }
  };

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          My Favorites
        </h1>

        <p className="text-sm text-zinc-500">
          {items.length} Saved Movies
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
            >
              <div className="aspect-[2/3] bg-zinc-800" />

              <div className="space-y-3 p-4">
                <div className="h-4 w-3/4 rounded bg-zinc-800" />
                <div className="h-3 w-1/2 rounded bg-zinc-800" />
                <div className="h-3 w-full rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-12 text-center">
          <h2 className="mb-2 text-xl font-semibold text-white">
            No Favorites Yet
          </h2>

          <p className="text-zinc-400">
            Start exploring movies and add them to your
            favorites.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {items.map((movie) => (
            <div
              key={movie._id}
              className="relative"
            >
              <MovieCard
                movie={{
                  id: movie.tmdbId,
                  title: movie.title,
                  poster_path: movie.posterPath,
                  release_date: movie.releaseDate,
                  vote_average: movie.voteAverage,
                  overview: movie.overview,
                }}
              />

              <button
                onClick={() =>
                  handleRemoveFavorite(movie.tmdbId)
                }
                className="absolute left-3 top-3 rounded-full bg-red-600 px-3 py-1 text-xs font-semibold text-white shadow-lg transition hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;