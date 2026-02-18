import { useState, useEffect } from "react";

const AdminEventForm = ({ onSubmit, selectedEvent, onCancel }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    price: "",
    availableSeats: "",
  });

  useEffect(() => {
    if (selectedEvent) {
      setForm(selectedEvent);
    } else {
      setForm({
        title: "",
        description: "",
        location: "",
        date: "",
        price: "",
        availableSeats: "",
      });
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-4">
      <form
        onSubmit={submit}
        className="w-full max-w-3xl bg-white shadow-2xl rounded-2xl p-8 space-y-6 border border-gray-100"
      >
        <h3 className="text-2xl font-bold text-gray-800 text-center">
          {selectedEvent ? "✏️ Edit Event" : "🎪 Create New Event"}
        </h3>

        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Event Title *
          </label>
          <input
            id="title"
            name="title"
            placeholder="Enter an exciting event title"
            value={form.title}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Location *
          </label>
          <input
            id="location"
            name="location"
            placeholder="Where will the event happen?"
            value={form.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
          />
        </div>

        {/* Row Fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Date *
            </label>
            <input
              id="date"
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Price (₹) *
            </label>
            <input
              id="price"
              type="number"
              name="price"
              placeholder="0"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Available Seats *
            </label>
            <input
              id="availableSeats"
              type="number"
              name="availableSeats"
              placeholder="0"
              value={form.availableSeats}
              onChange={handleChange}
              required
              min="0"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-600 mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe your amazing event in detail... (optional)"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none transition duration-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-medium hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
          )}

          <button
            type="submit"
            className="px-6 py-2 rounded-lg bg-indigo-600 text-white font-semibold shadow-md hover:bg-indigo-700 hover:shadow-lg transition duration-200"
          >
            {selectedEvent ? "Update Event" : "Create Event"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEventForm;