import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import eventsReducer from "../features/events/eventsSlice";
import bookingReducer from "../features/booking/bookingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventsReducer,
    booking: bookingReducer,
  },
});

export default store;