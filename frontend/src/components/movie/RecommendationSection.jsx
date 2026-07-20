import MovieCard from "./MovieCard";

const RecommendationSection = ({
  movies = [],
  isAuthenticated,
  activeTab,
}) => {
  const title =
    activeTab === "recommended"
      ? "🎯 Recommended For You"
      : "🎬 Similar Movies";

  const emptyMessage =
    activeTab === "recommended"
      ? "No recommendations found."
      : "No similar movies found.";

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        <span className="text-sm text-zinc-500">
          {movies.length} Movies
        </span>
      </div>

      {movies.length === 0 ? (
        <div className="flex h-52 items-center justify-center rounded-2xl border border-dashed border-zinc-700">
          <p className="text-center text-zinc-500">
            {emptyMessage}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default RecommendationSection;