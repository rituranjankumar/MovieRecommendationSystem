import { FaHeart, FaRegHeart, FaStar, FaCalendarAlt, FaClock, FaGlobe } from "react-icons/fa";

const MovieHero = ({
  movie,
  isFavorite,
  isAuthenticated,
  onFavoriteToggle,
}) => {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "https://placehold.co/500x750?text=No+Poster";

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`
    : poster;

  return (
    <section className="relative overflow-hidden z-10 rounded-3xl border border-zinc-800">

      {/* Backdrop */}
      <div className="relative h-[520px]  w-full">
        <img
          src={backdrop}
          alt={movie.title}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/50" />

        <div className="absolute inset-0 flex flex-col gap-8 p-8 md:flex-row md:items-end">

          {/* Poster */}
          <img
            src={poster}
            alt={movie.title}
            loading="eager"
            decoding="async"
            className="h-[360px] w-[240px] rounded-2xl object-cover shadow-2xl"
          />

          {/* Movie Info */}
          <div className="flex-1">

            <h1 className="text-4xl font-bold text-white">
              {movie.title}
            </h1>

            {movie.tagline && (
              <p className="mt-2 italic text-zinc-300">
                "{movie.tagline}"
              </p>
            )}

            {/* Stats */}
            <div className="mt-5 flex flex-wrap gap-5 text-zinc-300">

              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span>
                  {movie.vote_average?.toFixed(1)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                👥
                <span>{movie.vote_count} votes</span>
              </div>

              <div className="flex items-center gap-2">
                <FaCalendarAlt />
                <span>{movie.release_date}</span>
              </div>

              <div className="flex items-center gap-2">
                <FaClock />
                <span>{movie.runtime} min</span>
              </div>

              <div className="flex items-center gap-2">
                <FaGlobe />
                <span>
                  {movie.original_language?.toUpperCase()}
                </span>
              </div>

            </div>

            {/* Genres */}
            <div className="mt-6 flex flex-wrap gap-2">
              {movie.genres?.map((genre) => (
                <span
                  key={genre.id}
                  className="rounded-full bg-red-600/20 px-4 py-1 text-sm text-red-300"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            {/* Favorite Button */}
            <button
              onClick={onFavoriteToggle}
              className="mt-8 flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
            >
              {isFavorite ? (
                <>
                  <FaHeart />
                  Remove Favorite
                </>
              ) : (
                <>
                  <FaRegHeart />
                  {isAuthenticated
                    ? "Add to Favorites"
                    : "Login to Add Favorites"}
                </>
              )}
            </button>

          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieHero;