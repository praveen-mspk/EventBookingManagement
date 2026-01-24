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

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return "status-confirmed";
      case "PENDING":
        return "status-pending";
      case "CANCELLED":
        return "status-cancelled";
      default:
        return "status-default";
    }
  };

  if (loading) {
    return (
      <div className="bookings-container">
        <div className="loading-spinner">Loading your bookings...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bookings-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="bookings-container">
      <div className="bookings-header">
        <h2>🎊 My Bookings</h2>
        <p>Manage, track, and celebrate your upcoming events</p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>🎫 You haven't booked any events yet</p>
          <p className="text-muted">
            Explore our amazing events and make your first booking today!
          </p>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              <div className="booking-info">
                <h3>🎭 {booking.eventTitle}</h3>
                <div className="booking-details">
                  <span className="detail">
                    <span className="icon">🎫</span> 
                    <strong>{booking.numberOfTickets}</strong> ticket{booking.numberOfTickets > 1 ? 's' : ''}
                  </span>
                  <span className="detail">
                    <span className="icon">💰</span> 
                    <strong>₹{booking.totalAmount}</strong>
                  </span>
                  <span className="detail">
                    <span className="icon">🔖</span> 
                    Booking ID: #{booking.id}
                  </span>
                </div>
              </div>
              <div className="booking-status">
                <span className={`status-badge ${getStatusColor(booking.bookingStatus)}`}>
                  {booking.bookingStatus === "CONFIRMED" ? "✅ CONFIRMED" : 
                   booking.bookingStatus === "PENDING" ? "⏳ PENDING" : 
                   "❌ " + (booking.bookingStatus || "PENDING")}
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