import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { token, role } = useSelector((state) => state.auth);

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1>✨ Your Ultimate Event Booking Destination</h1>
          <p>
            Discover, book, and experience the most amazing events in your city.
            From concerts to conferences, we've got you covered!
          </p>
          {token ? (
            role === "ADMIN" ? (
              <Link to="/admin" className="btn-primary btn-lg">
                📊 Go to Admin Dashboard
              </Link>
            ) : (
              <Link to="/events" className="btn-primary btn-lg">
                🎫 Explore Events Now
              </Link>
            )
          ) : (
            <div className="hero-buttons">
              <Link to="/login" className="btn-primary btn-lg">
                🔑 Sign In
              </Link>
              <Link to="/signup" className="btn-secondary btn-lg">
                ✨ Create Account
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="features-section">
        <h2>🌟 Why Choose Smart Event Booking?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎭</div>
            <h3>Diverse Events</h3>
            <p>
              Access hundreds of curated events including concerts, conferences,
              workshops, and much more happening around you
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛡️</div>
            <h3>100% Secure</h3>
            <p>
              Your payments are protected with industry-leading Stripe security.
              Book with confidence, every single time
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Instant Tickets</h3>
            <p>
              Get your e-tickets instantly after successful payment. No waiting,
              no hassle, just pure convenience
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Lightning Fast</h3>
            <p>
              Our optimized platform loads instantly and processes bookings in
              seconds for a seamless experience
            </p>
          </div>
        </div>
      </section>

      <section className="features-section" style={{ background: "var(--gradient-light)", borderRadius: "20px", padding: "3rem" }}>
        <h2 style={{ textAlign: "center" }}>📱 How It Works</h2>
        <div className="features-grid">
          <div className="feature-card" style={{ textAlign: "center" }}>
            <div className="feature-icon" style={{ fontSize: "2.5rem" }}>1️⃣</div>
            <h3>Browse Events</h3>
            <p>Search and explore thousands of events tailored to your interests</p>
          </div>
          <div className="feature-card" style={{ textAlign: "center" }}>
            <div className="feature-icon" style={{ fontSize: "2.5rem" }}>2️⃣</div>
            <h3>Select Tickets</h3>
            <p>Choose your desired number of tickets and see instant pricing</p>
          </div>
          <div className="feature-card" style={{ textAlign: "center" }}>
            <div className="feature-icon" style={{ fontSize: "2.5rem" }}>3️⃣</div>
            <h3>Secure Payment</h3>
            <p>Complete your purchase with safe and encrypted payment options</p>
          </div>
          <div className="feature-card" style={{ textAlign: "center" }}>
            <div className="feature-icon" style={{ fontSize: "2.5rem" }}>4️⃣</div>
            <h3>Enjoy Events</h3>
            <p>Download your tickets and get ready for an amazing experience</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
