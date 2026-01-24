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

  if (loading) {
    return (
      <div className="event-details-container">
        <div className="loading-spinner">Loading event details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="event-details-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  if (!selectedEvent) return null;

  return (
    <div className="event-details-container">
      <div className="event-details-header">
        <div className="details-content">
          <h2>{selectedEvent.title}</h2>
          <div className="event-meta">
            <span className="meta-item">
              <span className="icon">📍</span> {selectedEvent.location}
            </span>
            <span className="meta-item">
              <span className="icon">📅</span> {new Date(selectedEvent.date).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="price-badge">₹{selectedEvent.price}/ticket</div>
      </div>

      <div className="event-details-grid">
        <div className="details-left">
          <section className="details-section">
            <h3>About This Event</h3>
            <p className="event-description">{selectedEvent.description}</p>
          </section>

          <section className="details-section">
            <h3>Event Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>Venue</label>
                <p>{selectedEvent.location}</p>
              </div>
              <div className="info-item">
                <label>Date</label>
                <p>{new Date(selectedEvent.date).toLocaleDateString()}</p>
              </div>
              <div className="info-item">
                <label>Available Seats</label>
                <p>{selectedEvent.availableSeats} seats</p>
              </div>
              <div className="info-item">
                <label>Price per Ticket</label>
                <p>₹{selectedEvent.price}</p>
              </div>
            </div>
          </section>
        </div>

        <div className="details-right">
          {!booking && (
            <div className="booking-card">
              <h3>Book Your Tickets</h3>
              
              <div className="form-group">
                <label htmlFor="tickets">Number of Tickets</label>
                <input
                  id="tickets"
                  type="number"
                  min="1"
                  max={selectedEvent.availableSeats}
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  className="form-input"
                />
              </div>

              <div className="booking-summary">
                <div className="summary-row">
                  <span>₹{selectedEvent.price} × {tickets} ticket{tickets > 1 ? 's' : ''}</span>
                  <span className="font-bold">₹{tickets * selectedEvent.price}</span>
                </div>
                <div className="summary-total">
                  <span>Total Amount</span>
                  <span className="text-lg font-bold">₹{tickets * selectedEvent.price}</span>
                </div>
              </div>

              <button 
                onClick={handleBooking} 
                disabled={bookingState.loading}
                className="btn-primary btn-block"
              >
                {bookingState.loading ? "Creating Booking..." : "Continue to Payment"}
              </button>

              {bookingState.error && (
                <div className="error-message">{bookingState.error}</div>
              )}
            </div>
          )}

          {booking && (
            <div className="payment-card">
              <StripePayment
                bookingId={booking.id}
                onSuccess={handlePaymentSuccess}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;