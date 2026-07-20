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
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
  <div className="mx-auto max-w-7xl px-4 py-4">

    {/* Top Row */}
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

      {/* Logo */}
      <Link
        to="/"
        className="text-2xl font-bold text-white text-center lg:text-left"
      >
        AIFlix
      </Link>

      {/* Navigation */}
      <nav className="flex flex-wrap justify-center gap-5 text-sm text-zinc-300">
        <NavLink to="/">Home</NavLink>

        <NavLink
          to="/favorites"
          className="flex items-center gap-1"
        >
          <FiHeart />
          Favorites
        </NavLink>

        <NavLink
          to="/profile"
          className="flex items-center gap-1"
        >
          <FiUser />
          Profile
        </NavLink>

        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1"
          >
            <FiLogOut />
            Logout
          </button>
        ) : (
          <NavLink to="/login">
            Login
          </NavLink>
        )}
      </nav>

    </div>

    {/* Search Bar */}
    <div className="relative mt-4">

      <div className="mx-auto flex max-w-3xl items-center rounded-full border border-zinc-700 bg-zinc-900 px-4 py-3">

        <FiSearch className="mr-3 text-zinc-400" />

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search movies..."
          className="w-full bg-transparent outline-none"
        />

      </div>

      {(loadingSuggestions || suggestions.length > 0) && (
        <div className="absolute left-0 right-0 z-50 mt-2 mx-auto max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl">

          {loadingSuggestions ? (
            <p className="p-4 text-zinc-400">
              Searching...
            </p>
          ) : (
            suggestions.map((movie) => (
              <button
                key={movie.id}
                onClick={() => handleSuggestionClick(movie)}
                className="flex w-full items-center px-4 py-3 hover:bg-zinc-900"
              >
                {movie.title}
              </button>
            ))
          )}

        </div>
      )}

    </div>

  </div>
</header>
  );
};

export default Navbar;