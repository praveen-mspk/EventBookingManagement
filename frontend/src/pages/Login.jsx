import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, role, loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(form));
  };

  useEffect(() => {
    if (token) {
      if (role === "ADMIN") navigate("/admin");
      else navigate("/events");
    }
  }, [token, role, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 text-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4"></div>
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-white/80 text-sm">
            Sign in to explore amazing events and book your tickets
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/20 border border-red-400 text-red-100 px-4 py-3 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/40 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/40 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your secure password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/40 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/40 transition"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-indigo-600 font-semibold py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "⏳ Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/80">
          <p>
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold underline hover:text-white transition"
            >
              Create one now
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;