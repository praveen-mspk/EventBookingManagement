import { useEffect, useState } from "react";
import api from "../services/api";
import AdminEventForm from "../components/AdminEventForm";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const loadEvents = async () => {
    const res = await api.get("/events");
    setEvents(res.data);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const createOrUpdate = async (event) => {
    if (event.id) {
      await api.put(`/events/${event.id}`, event);
    } else {
      await api.post("/events", event);
    }
    setSelectedEvent(null);
    loadEvents();
  };

  const deleteEvent = async (id) => {
    if (!window.confirm("Delete this event?")) return;
    await api.delete(`/events/${id}`);
    loadEvents();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <AdminEventForm
        onSubmit={createOrUpdate}
        selectedEvent={selectedEvent}
        onCancel={() => setSelectedEvent(null)}
      />

      <h3>All Events</h3>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Date</th>
            <th>Price</th>
            <th>Seats</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map((e) => (
            <tr key={e.id}>
              <td>{e.title}</td>
              <td>{e.location}</td>
              <td>{e.date}</td>
              <td>₹{e.price}</td>
              <td>{e.availableSeats}</td>
              <td>
                <button onClick={() => setSelectedEvent(e)}>Edit</button>
                <button onClick={() => deleteEvent(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;