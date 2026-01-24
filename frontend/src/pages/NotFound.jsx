import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">🔍 404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          We couldn't find the page you're looking for. 
          It might have been moved or doesn't exist anymore.
        </p>
        <Link to="/" className="btn-primary btn-lg">
          🏠 Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
