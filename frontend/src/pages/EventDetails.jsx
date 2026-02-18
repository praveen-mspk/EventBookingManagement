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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <div className="text-gray-600 animate-pulse text-lg">
          Loading event details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100">
        <div className="bg-red-100 text-red-700 px-6 py-4 rounded-lg border border-red-300">
          {error}
        </div>
      </div>
    );
  }

  if (!selectedEvent) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 p-6">

      {/* Header */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              🎪 {selectedEvent.title}
            </h2>

            <div className="flex flex-wrap gap-4 text-gray-600 mt-4 text-sm">
              <span> {selectedEvent.location}</span>
              <span>
                {" "}
                {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span>⭐ Premium Event</span>
            </div>
          </div>

          <div className="text-2xl font-bold text-white bg-indigo-600 px-6 py-3 rounded-xl shadow">
            ₹{selectedEvent.price}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left Side */}
        <div className="lg:col-span-2 space-y-6">

          {/* About Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-4">
               About This Event
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {selectedEvent.description ||
                "Get ready for an unforgettable experience! This event promises to deliver amazing moments and memories that will last a lifetime."}
            </p>
          </div>

          {/* Info Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-6">
              Event Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-semibold">{selectedEvent.location}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date & Time</p>
                <p className="font-semibold">
                  {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Available Seats</p>
                <p
                  className={`font-bold ${
                    selectedEvent.availableSeats < 10
                      ? "text-red-500"
                      : "text-green-600"
                  }`}
                >
                  {selectedEvent.availableSeats} seats
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Price per Ticket</p>
                <p className="font-semibold">
                  ₹{selectedEvent.price}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>

          {!booking && (
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-6">
              <h3 className="text-xl font-semibold mb-6">
                Book Your Tickets
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  Number of Tickets
                </label>
                <input
                  type="number"
                  min="1"
                  max={selectedEvent.availableSeats}
                  value={tickets}
                  onChange={(e) => setTickets(Number(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>

              {/* Summary */}
              <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm space-y-3">
                <div className="flex justify-between">
                  <span>
                    ₹{selectedEvent.price} × {tickets} ticket
                    {tickets > 1 ? "s" : ""}
                  </span>
                  <span className="font-semibold">
                    ₹{tickets * selectedEvent.price}
                  </span>
                </div>

                <div className="flex justify-between border-t pt-3 text-base font-bold">
                  <span>Total Amount</span>
                  <span>₹{tickets * selectedEvent.price}</span>
                </div>
              </div>

              <button
                onClick={handleBooking}
                disabled={bookingState.loading}
                className={`w-full py-3 rounded-lg font-semibold text-white shadow-md transition ${
                  bookingState.loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {bookingState.loading
                  ? "⏳ Creating Booking..."
                  : "Continue to Payment"}
              </button>

              {bookingState.error && (
                <div className="mt-4 bg-red-100 text-red-700 px-4 py-2 rounded-lg border border-red-300 text-sm">
                  {bookingState.error}
                </div>
              )}
            </div>
          )}

          {booking && (
            <div className="bg-white rounded-2xl shadow-xl p-6">
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