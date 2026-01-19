package com.smart.eventbooking.service.impl;

import com.smart.eventbooking.dto.BookingDTO;
import com.smart.eventbooking.entity.Booking;
import com.smart.eventbooking.entity.Event;
import com.smart.eventbooking.entity.User;
import com.smart.eventbooking.exception.BadRequestException;
import com.smart.eventbooking.exception.ResourceNotFoundException;
import com.smart.eventbooking.repository.BookingRepository;
import com.smart.eventbooking.repository.EventRepository;
import com.smart.eventbooking.service.BookingService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final EventRepository eventRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              EventRepository eventRepository) {
        this.bookingRepository = bookingRepository;
        this.eventRepository = eventRepository;
    }

    @Override
    public BookingDTO createBooking(Long eventId, int numberOfTickets, User user) {

        Event event = eventRepository.findById(eventId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Event not found"));

        if (event.getAvailableSeats() < numberOfTickets) {
            throw new BadRequestException("Not enough seats available");
        }

        double totalAmount = numberOfTickets * event.getPrice();

        event.setAvailableSeats(event.getAvailableSeats() - numberOfTickets);
        eventRepository.save(event);

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setEvent(event);
        booking.setNumberOfTickets(numberOfTickets);
        booking.setTotalAmount(totalAmount);
        booking.setBookingStatus("CONFIRMED");

        return mapToDTO(bookingRepository.save(booking));
    }

    @Override
    public List<BookingDTO> getBookingsByUser(User user) {
        return bookingRepository.findByUser(user)
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    private BookingDTO mapToDTO(Booking booking) {
        return new BookingDTO(
                booking.getId(),
                booking.getEvent().getTitle(),
                booking.getNumberOfTickets(),
                booking.getTotalAmount(),
                booking.getBookingStatus()
        );
    }
}