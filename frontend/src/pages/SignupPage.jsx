import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signupUser } from "../services/authService";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await signupUser(form, dispatch);

      toast.success("Account created successfully");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed"
      );
    }
  };

  return (
    <div className="mx-auto flex max-w-md flex-col rounded-2xl border border-zinc-800 bg-zinc-900 p-8">
      <h1 className="text-2xl font-semibold text-white">
        Create account
      </h1>

      <p className="mt-2 text-sm text-zinc-400">
        Join CineVerse and save your favorites.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >
        <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
        />

        <input
          className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm outline-none"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
        />

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-500"
        >
          {loading
            ? "Creating account..."
            : "Sign up"}
        </button>
      </form>

      <p className="mt-4 text-sm text-zinc-400">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-red-400"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;