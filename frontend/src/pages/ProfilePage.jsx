import { useSelector } from "react-redux";

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-2xl font-semibold text-white">
        Profile
      </h1>

      <p className="mt-2 text-zinc-400">
        Manage your account information.
      </p>

      <div className="mt-6 space-y-3 text-sm text-zinc-300">
        <p>
          <span className="text-white">Name:</span>{" "}
          {user?.name || "Guest"}
        </p>

        <p>
          <span className="text-white">Email:</span>{" "}
          {user?.email || "Not available"}
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;