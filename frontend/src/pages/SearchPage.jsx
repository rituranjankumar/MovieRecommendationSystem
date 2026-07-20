import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { searchMovies } from "../services/movieService";
import useDebounce from "../hooks/useDebounce";

const SearchPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search).get("q") || "";
  const debouncedQuery = useDebounce(query, 300);

  const { searchResults, loading } = useSelector(
    (state) => state.movies
  );

  useEffect(() => {
    if (!debouncedQuery.trim()) return;

    const fetchResults = async () => {
      try {
        await searchMovies(debouncedQuery, dispatch);
      } catch (error) {
        console.error(error);
      }
    };

    fetchResults();
  }, [debouncedQuery, dispatch]);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold text-white">
        Search results for "{query}"
      </h1>

      {loading ? (
        <p className="text-zinc-400">Searching...</p>
      ) : (
        <div className="grid grid-cols-2 z-100 gap-4 md:grid-cols-4">
          {searchResults.map((movie) => (
            <Link
              key={movie.id}
              to={`/movie/${movie.id}`}
              className="overflow-hidden  rounded-xl border border-zinc-800 bg-zinc-900 transition hover:border-red-600"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="h-72 w-full object-cover"
              />

              <div className="p-3">
                <p className="text-sm text-white">
                  {movie.title || movie.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;