import { useEffect, useState } from "react";
import api from "../services/api";
import AdminEventForm from "../components/AdminEventForm";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [selectedEventId, setSelectedEventId] = useState("");
  const [eventBookings, setEventBookings] = useState([]);
  const [bookingLoading, setBookingLoading] = useState(false);

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

  useEffect(() => {
    if (!selectedEventId) {
      setEventBookings([]);
      return;
    }

    const fetchBookings = async () => {
      try {
        setBookingLoading(true);
        const res = await api.get(
          `/admin/bookings/event/${selectedEventId}`
        );
        setEventBookings(res.data);
      } catch (err) {
        setEventBookings([]);
        console.error(err);
      } finally {
        setBookingLoading(false);
      }
    };

    fetchBookings();
  }, [selectedEventId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">

      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-gray-500 mt-2">
          Create, manage, and monitor all your events and bookings
        </p>
      </div>

      {error && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-100 text-red-700 px-4 py-3 rounded-lg border border-red-300">
          {error}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Form Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <AdminEventForm
            onSubmit={createOrUpdate}
            selectedEvent={selectedEvent}
            onCancel={() => setSelectedEvent(null)}
          />
        </div>

        {/* Events Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 overflow-x-auto">
          <h3 className="text-xl font-semibold mb-4">
            All Events ({events.length})
          </h3>

          {loading ? (
            <div className="text-gray-500 animate-pulse">
              Loading your amazing events...
            </div>
          ) : events.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-lg">No events created yet</p>
              <p className="text-sm mt-2">
                Create your first event using the form and start accepting bookings!
              </p>
            </div>
          ) : (
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <th className="px-4 py-3">Event</th>
                  <th className="px-4 py-3">Location</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Seats</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 font-semibold">
                      {e.title}
                    </td>
                    <td className="px-4 py-3">{e.location}</td>
                    <td className="px-4 py-3">
                      {new Date(e.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">₹{e.price}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-bold ${
                          e.availableSeats < 5
                            ? "text-red-500"
                            : "text-green-600"
                        }`}
                      >
                        {e.availableSeats}
                      </span>
                    </td>
                    <td className="px-4 py-3 flex justify-center gap-3">
                      <button
                        onClick={() => setSelectedEvent(e)}
                        className="px-3 py-1 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteEvent(e.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Bookings Section */}
      <div className="mt-10 bg-white rounded-2xl shadow-xl p-6 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-4">
          🎟️ View Bookings by Event
        </h3>

        <select
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none mb-6"
          value={selectedEventId}
          onChange={(e) => setSelectedEventId(e.target.value)}
        >
          <option value="">Select an Event</option>
          {events.map((ev) => (
            <option key={ev.id} value={ev.id}>
              {ev.title}
            </option>
          ))}
        </select>

        {bookingLoading && (
          <div className="text-gray-500 animate-pulse">
            Loading bookings...
          </div>
        )}

        {!bookingLoading &&
          selectedEventId &&
          eventBookings.length === 0 && (
            <p className="text-gray-500">
              No bookings for this event.
            </p>
          )}

        {eventBookings.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-xs">
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Tickets</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {eventBookings.map((b) => (
                  <tr
                    key={b.bookingId}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3">{b.userName}</td>
                    <td className="px-4 py-3">{b.userEmail}</td>
                    <td className="px-4 py-3">{b.numberOfTickets}</td>
                    <td className="px-4 py-3">₹{b.totalAmount}</td>
                    <td className="px-4 py-3 font-semibold text-indigo-600">
                      {b.bookingStatus}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;