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
    <form onSubmit={submit} className="admin-form">
      <h3 className="form-title">
        {selectedEvent ? "Edit Event" : "Create New Event"}
      </h3>

      <div className="form-group">
        <label htmlFor="title">Event Title *</label>
        <input
          id="title"
          name="title"
          placeholder="Enter event title"
          value={form.title}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="location">Location *</label>
        <input
          id="location"
          name="location"
          placeholder="Event location"
          value={form.location}
          onChange={handleChange}
          required
          className="form-input"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price (₹) *</label>
          <input
            id="price"
            type="number"
            name="price"
            placeholder="0"
            value={form.price}
            onChange={handleChange}
            required
            min="0"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label htmlFor="availableSeats">Available Seats *</label>
          <input
            id="availableSeats"
            type="number"
            name="availableSeats"
            placeholder="0"
            value={form.availableSeats}
            onChange={handleChange}
            required
            min="0"
            className="form-input"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Event description (optional)"
          value={form.description}
          onChange={handleChange}
          className="form-input"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {selectedEvent ? "Update Event" : "Create Event"}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default AdminEventForm;