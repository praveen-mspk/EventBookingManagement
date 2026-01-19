package com.smart.eventbooking.service;

import com.smart.eventbooking.dto.BookingDTO;
import com.smart.eventbooking.entity.User;

import java.util.List;

public interface BookingService {

    BookingDTO createBooking(Long eventId, int numberOfTickets, User user);

    List<BookingDTO> getBookingsByUser(User user);
}