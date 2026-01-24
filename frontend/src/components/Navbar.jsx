import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import "./Navbar.css";

const Navbar = () => {
  const { token, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">🎯</span>
          Smart Event Booking
        </Link>

        <div className="navbar-menu">
          {!token && (
            <div className="navbar-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/signup" className="nav-link">
                Signup
              </Link>
            </div>
          )}

          {token && role === "USER" && (
            <div className="navbar-links">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/events" className="nav-link">
                Events
              </Link>
              <Link to="/bookings" className="nav-link">
                My Bookings
              </Link>
              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </div>
          )}

          {token && role === "ADMIN" && (
            <div className="navbar-links">
              <Link to="/admin" className="nav-link">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="nav-logout">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;