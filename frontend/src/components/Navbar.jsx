import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiSearch, FiHeart, FiUser, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { logoutUser } from "../services/authService";
import api from "../services/api";
import useDebounce from "../hooks/useDebounce";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const debouncedQuery = useDebounce(query, 300);

  useEffect(() => {
    const searchSuggestions = async () => {
      if (!debouncedQuery.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        setLoadingSuggestions(true);

        const response = await api.get("/movies/search", {
          params: {
            query: debouncedQuery,
          },
        });

        setSuggestions(response.data.movies.slice(0, 6));
      } catch (error) {
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    };

    searchSuggestions();
  }, [debouncedQuery]);

  const handleLogout = async () => {
    try {
      await logoutUser(dispatch);

      toast.success("Logged out");

      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);

      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (movie) => {
    setQuery("");
    setSuggestions([]);

    navigate(`/movie/${movie.id}`);
  };

  return (
    <header className="relative z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="text-xl font-semibold tracking-wide text-white"
        >
          AIFlix 
        </Link>

        <div className="hidden flex-1 items-center justify-center px-6 md:flex">
          <div className="relative w-full max-w-xl">
            <div className="flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-2">
              <FiSearch className="mr-2 text-zinc-400" />

              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search movies"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>

            {(suggestions.length > 0 || loadingSuggestions) && (
              <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-zinc-800 bg-zinc-950 shadow-xl">
                {loadingSuggestions ? (
                  <p className="px-4 py-3 text-sm text-zinc-400">
                    Searching...
                  </p>
                ) : (
                  suggestions.map((movie) => (
                    <button
                      key={movie.id}
                      onClick={() =>
                        handleSuggestionClick(movie)
                      }
                      className="flex w-full z-50 items-center gap-3 px-4 py-3 text-left text-sm text-zinc-300 transition hover:bg-zinc-900"
                    >
                      <span className="text-white">
                        {movie.title || movie.name}
                      </span>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        <nav className="flex items-center gap-4 text-sm text-zinc-300">
          <NavLink
            to="/"
            className="transition hover:text-white"
          >
            Home
          </NavLink>

          <NavLink
            to="/favorites"
            className="flex items-center gap-1 transition hover:text-white"
          >
            <FiHeart />
            Favorites
          </NavLink>

          <NavLink
            to="/profile"
            className="flex items-center gap-1 transition hover:text-white"
          >
            <FiUser />
            Profile
          </NavLink>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-1 transition hover:text-white"
            >
              <FiLogOut />
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className="transition hover:text-white"
            >
              Login
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;