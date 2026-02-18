import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import { Link } from "react-router-dom";

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold animate-pulse text-gray-600">
          Loading events...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-red-100 text-red-600 px-6 py-4 rounded-xl shadow">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-6">
      
      {/* Header */}
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Available Events
        </h2>
        <p className="text-gray-600 text-lg">
          Discover and book your favorite events — exciting moments await!
        </p>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="max-w-xl mx-auto text-center bg-white p-10 rounded-2xl shadow-md">
          <p className="text-2xl mb-3">No events found</p>
          <p className="text-gray-500">
            Don't worry! New events are being added every day. Check back soon!
          </p>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between"
            >
              {/* Card Content */}
              <div className="p-6">
                
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-gray-800">
                    {event.title}
                  </h3>
                  <span className="bg-indigo-100 text-indigo-600 font-semibold px-3 py-1 rounded-full text-sm">
                    ₹{event.price}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 text-gray-600 text-sm mb-4">
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span></span>
                    <span>
                      {new Date(event.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span></span>
                    <span>
                      <strong>{event.availableSeats}</strong> seats left
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-500 text-sm line-clamp-3">
                  {event.description ||
                    "Experience an amazing event like never before!"}
                </p>
              </div>

              {/* Button */}
              <div className="p-6 pt-0">
                <Link
                  to={`/events/${event.id}`}
                  className="block text-center bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition duration-300"
                >
                   View Details & Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;