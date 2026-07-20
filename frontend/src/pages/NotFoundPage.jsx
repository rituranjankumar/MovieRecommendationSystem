const NotFoundPage = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 p-8 text-center">
      <h1 className="text-4xl font-semibold text-white">
        404
      </h1>

      <p className="mt-2 text-zinc-400">
        The page you are looking for does not exist.
      </p>
    </div>
  );
};

export default NotFoundPage;