import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import {
  fetchEventById,
  clearSelectedEvent,
} from "../features/events/eventsSlice";
import { createBooking } from "../features/booking/bookingSlice";
import StripePayment from "../components/StripePayment";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { selectedEvent, loading, error } = useSelector(
    (state) => state.events
  );

  const bookingState = useSelector((state) => state.booking);

  const [tickets, setTickets] = useState(1);
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    dispatch(fetchEventById(id));
    return () => dispatch(clearSelectedEvent());
  }, [dispatch, id]);

  const handleBooking = async () => {
    const result = await dispatch(
      createBooking({
        eventId: selectedEvent.id,
        numberOfTickets: tickets,
      })
    );

    if (result.meta.requestStatus === "fulfilled") {
      setBooking(result.payload);
    }
  };

  const handlePaymentSuccess = () => {
    navigate("/bookings");
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!selectedEvent) return null;

  return (
    <div>
      <h2>{selectedEvent.title}</h2>
      <p>{selectedEvent.description}</p>
      <p>Location: {selectedEvent.location}</p>
      <p>Date: {selectedEvent.date}</p>
      <p>Available Seats: {selectedEvent.availableSeats}</p>
      <p>Price per Ticket: ₹{selectedEvent.price}</p>

      {!booking && (
        <>
          <label>Tickets:</label>
          <input
            type="number"
            min="1"
            max={selectedEvent.availableSeats}
            value={tickets}
            onChange={(e) => setTickets(Number(e.target.value))}
          />

          <p>Total Amount: ₹{tickets * selectedEvent.price}</p>

          <button onClick={handleBooking} disabled={bookingState.loading}>
            {bookingState.loading ? "Booking..." : "Book Ticket"}
          </button>

          {bookingState.error && (
            <p style={{ color: "red" }}>{bookingState.error}</p>
          )}
        </>
      )}

      {booking && (
        <StripePayment
          bookingId={booking.id}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </div>
  );
};

export default EventDetails;