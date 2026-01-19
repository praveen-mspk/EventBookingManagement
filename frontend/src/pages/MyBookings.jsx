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

  if (loading) return <p>Loading bookings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>My Bookings</h2>

      {bookings.length === 0 && <p>No bookings found</p>}

      <ul>
        {bookings.map((booking) => (
          <li key={booking.id}>
            <h3>{booking.eventTitle}</h3>
            <p>Tickets: {booking.numberOfTickets}</p>
            <p>Total: ₹{booking.totalAmount}</p>
            <p>Status: {booking.bookingStatus}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBookings;