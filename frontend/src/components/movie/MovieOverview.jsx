const MovieOverview = ({ movie }) => {
  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Overview
      </h2>

      {movie.overview ? (
        <p className="text-lg leading-8 text-zinc-300">
          {movie.overview}
        </p>
      ) : (
        <p className="text-zinc-500">
          No overview available.
        </p>
      )}

      <div className="mt-10 border-t border-zinc-800 pt-6">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Genres
        </h3>

        <div className="flex flex-wrap gap-3">
          {movie.genres?.length ? (
            movie.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-full bg-red-600/20 px-5 py-2 text-sm font-medium text-red-300 ring-1 ring-red-500/30"
              >
                {genre.name}
              </span>
            ))
          ) : (
            <span className="text-zinc-500">
              Genres unavailable
            </span>
          )}
        </div>
      </div>

      {(movie.budget || movie.revenue) && (
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-zinc-800/50 p-5">
            <p className="text-sm text-zinc-400">
              Budget
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              {movie.budget
                ? `$${movie.budget.toLocaleString()}`
                : "Unknown"}
            </h3>
          </div>

          <div className="rounded-2xl bg-zinc-800/50 p-5">
            <p className="text-sm text-zinc-400">
              Revenue
            </p>

            <h3 className="mt-2 text-2xl font-bold text-white">
              {movie.revenue
                ? `$${movie.revenue.toLocaleString()}`
                : "Unknown"}
            </h3>
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieOverview;