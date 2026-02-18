import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await dispatch(signupUser(form));
    if (result.meta.requestStatus === "fulfilled") {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-4">
      
      <div className="w-full max-w-md bg-white/20 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl p-8 text-white">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4"></div>
          <h2 className="text-3xl font-bold mb-2">Join Our Community!</h2>
          <p className="text-white/80 text-sm">
            Create your account and discover unforgettable events
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
          
          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-white/40 placeholder-white/70 text-white focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/40 transition"
            />
          </div>

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
              placeholder="Create a strong password (8+ characters)"
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
            {loading ? "⏳ Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-white/80">
          <p>
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold underline hover:text-white transition"
            >
              Sign in here
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Signup;