import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Smart Event Booking System</h1>
          <p>Discover, book, and enjoy amazing events</p>
          {token ? (
            role === "ADMIN" ? (
              <Link to="/admin" className="btn-primary btn-lg">
                Go to Admin Dashboard
              </Link>
            ) : (
              <Link to="/events" className="btn-primary btn-lg">
                Explore Events
              </Link>
            )
          ) : (
            <div className="hero-buttons">
              <Link to="/login" className="btn-primary btn-lg">
                Login
              </Link>
              <Link to="/signup" className="btn-secondary btn-lg">
                Create Account
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Wide Selection</h3>
            <p>Browse hundreds of events happening near you</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Booking</h3>
            <p>Safe and secure payment with Stripe integration</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Confirmation</h3>
            <p>Get your tickets instantly after booking</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💬</div>
            <h3>24/7 Support</h3>
            <p>We're here to help anytime, anywhere</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
