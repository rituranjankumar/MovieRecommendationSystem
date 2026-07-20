import {
  FaStar,
  FaCalendarAlt,
  FaClock,
  FaGlobe,
  FaUsers,
  FaFilm,
} from "react-icons/fa";

const MovieStats = ({ movie }) => {
  const stats = [
    {
      icon: <FaStar className="text-yellow-400 text-2xl" />,
      label: "Rating",
      value: movie.vote_average
        ? `${movie.vote_average.toFixed(1)} / 10`
        : "N/A",
    },
    {
      icon: <FaUsers className="text-blue-400 text-2xl" />,
      label: "Votes",
      value: movie.vote_count?.toLocaleString() || "N/A",
    },
    {
      icon: <FaCalendarAlt className="text-green-400 text-2xl" />,
      label: "Release",
      value: movie.release_date || "Unknown",
    },
    {
      icon: <FaClock className="text-purple-400 text-2xl" />,
      label: "Runtime",
      value: movie.runtime
        ? `${movie.runtime} min`
        : "N/A",
    },
    {
      icon: <FaGlobe className="text-cyan-400 text-2xl" />,
      label: "Language",
      value: movie.original_language
        ? movie.original_language.toUpperCase()
        : "N/A",
    },
    {
      icon: <FaFilm className="text-red-400 text-2xl" />,
      label: "Status",
      value: movie.status || "Released",
    },
  ];

  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold text-white">
        Movie Information
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, index) => (
          <div
            key={index}
            className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition hover:border-red-500"
          >
            <div className="mb-4">
              {item.icon}
            </div>

            <p className="text-sm text-zinc-400">
              {item.label}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {item.value}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieStats; 