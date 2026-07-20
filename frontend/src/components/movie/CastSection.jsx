const CastSection = ({ cast = [] }) => {
  const topCast = cast.slice(0, 10);

  return (
    <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Top Cast
      </h2>

      {topCast.length === 0 ? (
        <p className="text-zinc-500">
          Cast information not available.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {topCast.map((person) => {
            const profileImage = person.profile_path
              ? `https://image.tmdb.org/t/p/w300${person.profile_path}`
              : "https://placehold.co/300x450?text=No+Photo";

            return (
              <div
                key={person.id}
                className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 transition duration-300 hover:-translate-y-1 hover:border-red-500"
              >
                <img
                  src={profileImage}
                  alt={person.name}
                  className="h-64 w-full object-cover"
                />

                <div className="p-4">
                  <h3 className="line-clamp-2 text-base font-semibold text-white">
                    {person.name}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {person.character || "Unknown Character"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default CastSection;