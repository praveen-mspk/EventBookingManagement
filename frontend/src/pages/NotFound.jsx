import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary">
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
