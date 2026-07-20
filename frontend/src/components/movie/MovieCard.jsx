import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const poster = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={poster}
          alt={movie.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/80 px-3 py-1 text-sm font-semibold text-yellow-400 backdrop-blur">
          <FaStar className="text-xs" />
          {movie.vote_average?.toFixed(1) || "N/A"}
        </div>
      </div>

      <div className="space-y-2 p-4">
        <h3 className="line-clamp-2 text-lg font-semibold text-white transition group-hover:text-red-400">
          {movie.title}
        </h3>

        <p className="text-sm text-zinc-400">
          {movie.release_date
            ? movie.release_date.split("-")[0]
            : "Unknown"}
        </p>

        <p className="line-clamp-3 text-sm leading-6 text-zinc-500">
          {movie.overview || "No description available."}
        </p>
      </div>
    </Link>
  );
};

export default MovieCard; 