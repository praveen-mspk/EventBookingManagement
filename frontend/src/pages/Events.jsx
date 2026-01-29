import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../features/events/eventsSlice";
import { Link } from "react-router-dom";
import "../styles/events.css";
const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="events-container">
        <div className="loading-spinner">Loading events...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="events-container">
        <div className="error-message">{error}</div>
      </div>
    );
  }

  return (
    <div className="events-container">
      <div className="events-header">
        <h2>🎉 Available Events</h2>
        <p>Discover and book your favorite events - exciting moments await!</p>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>😔 No events found at the moment</p>
          <p className="text-muted">Don't worry! New events are being added every day. Check back soon!</p>
        </div>
      ) : (
        <div className="events-grid">
          {events.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-header">
                <h3>{event.title}</h3>
                <span className="event-price">₹{event.price}</span>
              </div>
              
              <div className="event-details">
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <p style={{ margin: 0 }}>{event.location}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="icon">📅</span>
                  <div>
                    <p style={{ margin: 0 }}>{new Date(event.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="icon">💺</span>
                  <div>
                    <p style={{ margin: 0 }}>
                      <strong>{event.availableSeats}</strong> seats left
                    </p>
                  </div>
                </div>
              </div>

              <p className="event-description">
                {event.description || "Experience an amazing event like never before!"}
              </p>

              <Link to={`/events/${event.id}`} className="btn-primary btn-block">
                🎫 View Details & Book
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;