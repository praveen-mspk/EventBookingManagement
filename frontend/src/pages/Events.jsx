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

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>Available Events</h2>

      {events.length === 0 && <p>No events found</p>}

      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.title}</h3>
            <p>{event.location}</p>
            <p>Date: {event.date}</p>
            <p>Price: ₹{event.price}</p>

            <Link to={`/events/${event.id}`}>View Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Events;