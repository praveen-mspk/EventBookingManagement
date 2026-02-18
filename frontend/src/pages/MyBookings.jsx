import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyBookings } from "../features/booking/bookingSlice";

const MyBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector(
    (state) => state.booking
  );

  useEffect(() => {
    dispatch(fetchMyBookings());
  }, [dispatch]);

  const getStatusStyles = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "bg-green-100 text-green-700";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700";
      case "CANCELLED":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-lg font-semibold animate-pulse text-gray-600">
          Loading your bookings...
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
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          My Bookings
        </h2>
        <p className="text-gray-600 text-lg">
          Manage, track, and celebrate your upcoming events
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-md p-10 text-center">
          <p className="text-2xl mb-3">
            You haven't booked any events yet
          </p>
          <p className="text-gray-500">
            Explore our amazing events and make your first booking today!
          </p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto space-y-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              
              {/* Booking Info */}
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                   {booking.eventTitle}
                </h3>

                <div className="flex flex-wrap gap-6 text-gray-600 text-sm">
                  <div className="flex items-center gap-2">
                    <span></span>
                    <span>
                      <strong>{booking.numberOfTickets}</strong> ticket
                      {booking.numberOfTickets > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span></span>
                    <span>
                      <strong>₹{booking.totalAmount}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span></span>
                    <span>Booking ID: #{booking.id}</span>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusStyles(
                    booking.bookingStatus
                  )}`}
                >
                  {booking.bookingStatus === "CONFIRMED"
                    ? "CONFIRMED"
                    : booking.bookingStatus === "PENDING"
                    ? "PENDING"
                    : "" + (booking.bookingStatus || "PENDING")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;