import { useEffect, useState } from "react";
import api from "../services/api";
import AdminEventForm from "../components/AdminEventForm";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/events");
      setEvents(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to load events");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const createOrUpdate = async (event) => {
    try {
      if (event.id) {
        await api.put(`/events/${event.id}`, event);
      } else {
        await api.post("/events", event);
      }
      setSelectedEvent(null);
      loadEvents();
    } catch (err) {
      setError("Failed to save event");
      console.error(err);
    }
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;
    try {
      await api.delete(`/events/${id}`);
      loadEvents();
    } catch (err) {
      setError("Failed to delete event");
      console.error(err);
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>📊 Admin Dashboard</h2>
        <p>Create, manage, and monitor all your events and bookings</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="admin-grid">
        <div className="admin-form-section">
          <AdminEventForm
            onSubmit={createOrUpdate}
            selectedEvent={selectedEvent}
            onCancel={() => setSelectedEvent(null)}
          />
        </div>

        <div className="admin-events-section">
          <div className="section-header">
            <h3>📅 All Events ({events.length})</h3>
          </div>

          {loading ? (
            <div className="loading-spinner">Loading your amazing events...</div>
          ) : events.length === 0 ? (
            <div className="empty-state">
              <p>🎭 No events created yet</p>
              <p className="text-muted">Create your first event using the form on the left and start accepting bookings!</p>
            </div>
          ) : (
            <div className="events-table-responsive">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>🎪 Event Title</th>
                    <th>📍 Location</th>
                    <th>🗓️ Date</th>
                    <th>💰 Price</th>
                    <th>💺 Seats</th>
                    <th>⚙️ Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((e) => (
                    <tr key={e.id}>
                      <td className="font-semibold">{e.title}</td>
                      <td>{e.location}</td>
                      <td>{new Date(e.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</td>
                      <td>₹{e.price}</td>
                      <td>
                        <span style={{ color: e.availableSeats < 5 ? "#ef4444" : "#10b981", fontWeight: "700" }}>
                          {e.availableSeats}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            onClick={() => setSelectedEvent(e)}
                            className="btn-edit"
                            title="Edit this event"
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            onClick={() => deleteEvent(e.id)}
                            className="btn-delete"
                            title="Delete this event"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;