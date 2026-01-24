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
        <h2>Available Events</h2>
        <p>Browse and book your favorite events</p>
      </div>

      {events.length === 0 ? (
        <div className="empty-state">
          <p>No events found at the moment</p>
          <p className="text-muted">Check back later for new events!</p>
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
                  <p>{event.location}</p>
                </div>
                <div className="detail-item">
                  <span className="icon">📅</span>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
                <div className="detail-item">
                  <span className="icon">💺</span>
                  <p>{event.availableSeats} seats available</p>
                </div>
              </div>

              <p className="event-description">{event.description}</p>

              <Link to={`/events/${event.id}`} className="btn-primary btn-block">
                View Details & Book
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;