import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 px-6 text-white">
      
      <div className="text-center max-w-lg">
        
        <h1 className="text-8xl font-extrabold mb-6 drop-shadow-lg">
          🔍 404
        </h1>

        <h2 className="text-3xl font-bold mb-4">
          Oops! Page Not Found
        </h2>

        <p className="text-white/90 mb-8 text-lg">
          We couldn't find the page you're looking for.
          It might have been moved or doesn't exist anymore.
        </p>

        <Link
          to="/"
          className="inline-block bg-white text-indigo-600 font-semibold px-8 py-4 rounded-2xl shadow-xl hover:scale-105 hover:shadow-2xl transition duration-300"
        >
          Back to Home
        </Link>

      </div>
    </div>
  );
};

export default NotFound;