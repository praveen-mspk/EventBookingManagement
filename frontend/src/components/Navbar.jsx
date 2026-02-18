import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          <span className="text-2xl"></span>
          Smart Event Booking
        </Link>

        {/* Menu */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">
          
          {/* Not Logged In */}
          {!token && (
            <>
              <Link
                to="/login"
                className="hover:text-indigo-600 transition duration-200"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition duration-200"
              >
                Signup
              </Link>
            </>
          )}

          {/* USER Role */}
          {token && role === "USER" && (
            <>
              <Link
                to="/"
                className="hover:text-indigo-600 transition duration-200"
              >
                Home
              </Link>
              <Link
                to="/events"
                className="hover:text-indigo-600 transition duration-200"
              >
                Events
              </Link>
              <Link
                to="/bookings"
                className="hover:text-indigo-600 transition duration-200"
              >
                My Bookings
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          )}

          {/* ADMIN Role */}
          {token && role === "ADMIN" && (
            <>
              <Link
                to="/admin"
                className="hover:text-indigo-600 transition duration-200"
              >
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;