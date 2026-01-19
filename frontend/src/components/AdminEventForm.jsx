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
    }
  }, [selectedEvent]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={submit}>
      <h3>{selectedEvent ? "Edit Event" : "Create Event"}</h3>

      <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
      <input name="location" placeholder="Location" value={form.location} onChange={handleChange} required />
      <input type="date" name="date" value={form.date} onChange={handleChange} required />
      <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} required />
      <input type="number" name="availableSeats" placeholder="Seats" value={form.availableSeats} onChange={handleChange} required />

      <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />

      <button type="submit">Save</button>
      {onCancel && <button onClick={onCancel}>Cancel</button>}
    </form>
  );
};

export default AdminEventForm;